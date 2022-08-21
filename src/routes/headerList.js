import express from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';
import axios from 'axios';
import { order, basket } from '../db/models';
import Layout from '../components/Layout';

const route = express.Router();

route.get('/', async (req, res) => {
  const initState = { path: req.originalUrl, userSession: req.session.userSession };
  // const initState = { path: req.originalUrl };

  const order1 = await order.findAll();
  initState.order = order1;
  const html = renderToString(<Layout initState={initState} />);
  res.write('<!DOCTYPE html>');
  res.end(html);
});

route.get('/details/:id', async (req, res) => {
  const { id } = req.params;
  const initState = { path: req.originalUrl, userSession: req.session.userSession };
  // const initState = { path: req.originalUrl };
  const orderid = await order.findByPk(id);
  initState.orderid = orderid;
  const html = renderToString(<Layout initState={initState} />);
  res.write('<!DOCTYPE html>');
  res.end(html);
});

route.get('/addProdukt', async (req, res) => {
  const initState = { path: req.originalUrl, userSession: req.session.userSession };
  // const initState = { path: req.originalUrl };
  const order1 = await order.findAll();
  initState.order = order1;
  const html = renderToString(<Layout initState={initState} />);
  res.write('<!DOCTYPE html>');
  res.end(html);
});
route.post('/addProdukt', async (req, res) => {
  const initState = { path: req.originalUrl, userSession: req.session.userSession };
  // console.log('1', req.body);
  // const { workerId } = authState;
  // console.log(workerId);
  // const {
  //   name, location, description, img, price, discont, wokerId,
  // } = req.body;
  // console.log({
  //   name, location, description, img, price, discont,
  // });
  // await order.create({
  //   name, location, description, img, price, discont, wokerId,
  // });
  const address = req.body.location;
  console.log(req.body);

  const url = encodeURI(`https://catalog.api.2gis.com/3.0/items/geocode?q=${address}&fields=items.point&key=ruxkjk8859`);
  const coordinates = await axios.get(url);
  const { lat } = coordinates.data.result.items[0].point;
  const { lon } = coordinates.data.result.items[0].point;
  req.body.lat = lat;
  req.body.lon = lon;
  console.log(req.body);
  await order.create(req.body);
  res.sendStatus(200);
});

route.post('/toBasket', async (req, res) => {
  const initState = { path: req.originalUrl, userSession: req.session.userSession };
  // console.log('1', req.body);
  // const { workerId } = authState;
  // console.log(workerId);
  // const {
  //   name, location, description, img, price, discont, wokerId,
  // } = req.body;
  // console.log({
  //   name, location, description, img, price, discont,
  // });
  // await order.create({
  //   name, location, description, img, price, discont, wokerId,
  // });
  await basket.create(req.body);
  res.sendStatus(200);
});

export default route;
