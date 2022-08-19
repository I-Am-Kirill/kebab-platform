import express from 'express';
import bcrypt from 'bcrypt';
import { woker } from '../db/models';
import { user } from '../db/models';
import React from 'react';
import Layout from '../components/Layout';
import { renderToString } from 'react-dom/server';

const route = express.Router();

route.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const waker1 = await woker.findOne({ where: { email } });
    const user1 = await user.findOne({ where: { email } });
    console.log(user1)
    if (user1) {
      const checkPass = await bcrypt.compare(password, user1.password);
      if (checkPass) {
        req.session.userSession = { email: user1.email, name: user1.name, id: user1.id };
        return res.json({ name: user1.name });
      }
      res.status(400).json({ message: 'Не верный логин или пароль' });
    }
    if (waker1) {
      const checkPass = await bcrypt.compare(password, waker1.password);
      if (checkPass) {
        req.session.userSession = { email: waker1.email, name: waker1.name, id: waker1.id };
        return res.json({ name: waker1.name });
      }
      res.status(400).json({ message: 'Не верный логин или пароль' });
    }
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

route.get('/logout', async (req, res) => {
  console.log('im here')
  res.clearCookie('user_sid'); // Удалить куку
  req.session.destroy(); // Завершить сессию
  res.sendStatus(200);
});
export default route;