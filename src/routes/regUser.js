import express from 'express';
import bcrypt from 'bcrypt';
import { user } from '../db/models';

const route = express.Router();

route.post('/', async (req, res) => {
  const { name, email, tel, address, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const user1 = await user.findOne({ where: { email } });
    if (!user1) {
      const newUser = await user.create({ email, name, password: hashPassword, tel, address });
      req.session.userSession = { email: newUser.email, id: newUser.id };
      return res.json({ email: newUser.email });
    }
    res.status(400).json({ message: 'Такой email уже занят' });
  } catch (err) {
    console.error(err);
  }
});

route.get('/', (req, res) => {
  const initState = { path: req.originalUrl };
  const layout = React.createElement(Layout, { initState });
  const html = renderToString(layout);
  res.write('<!DOCTYPE html>');
  res.end(html);
});
export default route;