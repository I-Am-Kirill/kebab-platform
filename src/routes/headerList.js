import express from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';
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
