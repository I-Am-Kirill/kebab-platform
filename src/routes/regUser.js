import express from 'express';
import React from 'react';
import bcrypt from 'bcrypt';
import axios from 'axios';
import { renderToString } from 'react-dom/server';
import { user } from '../db/models';
import Layout from '../components/Layout';

const route = express.Router();

route.post('/', async (req, res) => {
  const {
    name, email, tel, address, password, isworker,
  } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const user1 = await user.findOne({ where: { email } });
    if (!user1) {
      // const adress = 'Москва, Садовническая, 25';
      // console.log(address);
      const url = encodeURI(`https://catalog.api.2gis.com/3.0/items/geocode?q=${address}&fields=items.point&key=ruxkjk8859`);
      const coordinates = await axios.get(url);
      const { lat } = coordinates.data.result.items[0].point;
      const { lon } = coordinates.data.result.items[0].point;
      // console.log(coordinates.data.result.items[0].point);
      // console.log(coordLat, coordLon);
      const newUser = await user.create({
        email, name, password: hashPassword, tel, address, isworker, lat, lon,
      });
      req.session.userSession = {
        email: newUser.email,
        id: newUser.id,
        isworker: newUser.isworker,
        lat: newUser.lat,
        lon: newUser.lon,
      };
      return res.json({
        email: newUser.email,
        isworker: newUser.isworker,
        lat: newUser.lat,
        lon: newUser.lon,
      });
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
