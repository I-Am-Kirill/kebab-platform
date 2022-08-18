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
    if (user1 || waker1) {
      const checkPass = await bcrypt.compare(password, user.password ||
        password, woker.password);
      if (checkPass) {
        req.session.userSession = { email: user.email, name: user.name, id: user.id } ||
          { email: woker.email, name: woker.name, id: woker.id };
        return res.json({ name: user.name } || { name: woker.name });
      }
      res.status(400).json({ message: 'Такой email уже занят' });
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
  res.clearCookie('user_sid'); // Удалить куку
  req.session.destroy(); // Завершить сессию
  res.sendStatus(200);
});
export default route;