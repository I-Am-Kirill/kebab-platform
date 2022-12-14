import express from 'express';
import morgan from 'morgan';
import store from 'session-file-store';
import session from 'express-session';
import headerList from './routes/headerList';
import regRouter from './routes/regRouter';
import regUser from './routes/regUser';
import regWaker from './routes/regWaker';
import loginRouter from './routes/loginRouter';
import basket from './routes/basket';
import list from './routes/list';
import deleteRouter from './routes/deleteRouter';
import updateRouter from './routes/updateRouter';
import produktRouter from './routes/productRouter';
import apiEffects from './routes/api/apiEffect';

// import authCheck from './middlewares/authCheck';

const PORT = 3000;
const app = express();
const FileStore = store(session);

const sessionConfig = {
  name: 'user_sid', // Имя куки для хранения id сессии. По умолчанию - connect.sid
  secret: process.env.SESSION_SECRET ?? 'test',	// Секретное слово для шифрования, может быть любым
  resave: false, // Пересохранять ли куку при каждом запросе
  saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
  store: new FileStore(),
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
  },
};

app.use(session(sessionConfig));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/', headerList);
app.use('/registration', regRouter);
app.use('/regWoker', regWaker);
app.use('/regUser', regUser);
app.use('/login', loginRouter);
app.use('/basket', basket);
app.use('/list', list);
app.use('/del', deleteRouter);
app.use('/update', updateRouter);
app.use('/api', produktRouter);
app.use('/api/all', apiEffects);

// app.use(authCheck);

app.listen(PORT, () => {
  console.log('Server start on', PORT);
});
