import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../db/models';

const route = express.Router();

route.post('/regUser', async (req, res) => {
  const { name, email, tel, address } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      const newUser = await User.create({ email, name, password: hashPassword });
      req.session.userSession = { email: newUser.email, id: newUser.id};
      return res.json({ email: newUser.email });
    }
    res.status(400).json({ message: 'Такой email уже занят' });
  } catch (err) {
    console.error(err);
  }
});