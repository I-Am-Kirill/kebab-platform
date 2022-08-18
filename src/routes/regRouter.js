import express from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { order } from '../db/models';
import Layout from '../components/Layout';

const route = express.Router();

route.get('/', async (req, res) => {
  // const initState = { path: req.originalUrl, userSession: req.session.userSession };
  const initState = { path: req.originalUrl };
  const order1 = await order.findAll();
  initState.order = order1;
  const html = renderToString(<Layout initState={initState} />);
  res.write('<!DOCTYPE html>');
  res.end(html);
});