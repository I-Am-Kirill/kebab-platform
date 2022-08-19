import express from 'express';
import morgan from 'morgan';
import headerList from './routes/headerList';
import detailsPost from './routes/detailsPost';
import mapWork from './routes/mapWork';

const PORT = 3000;
const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/', headerList);
app.use('/details', detailsPost);
app.use('/mapWork', mapWork);

app.listen(PORT, () => {
  console.log('Server start on', PORT);
});
