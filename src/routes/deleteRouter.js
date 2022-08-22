import express from 'express';
import React from 'react';
import Layout from '../components/Layout';
import { order } from '../db/models';

const route = express.Router();

route.delete('/:id', async (req, res) => {
  // const orderDel = await order.findOne({ where: { id } });
  console.log(req.params.id)
  await order.destroy({ where: { id: req.params.id } });
  res.sendStatus(200)
});
route.get('/', (req, res) => {
  const initState = { path: req.originalUrl };
  const layout = React.createElement(Layout, { initState });
  const html = renderToString(layout);
  res.write('<!DOCTYPE html>');
  res.end(html);
})
export default route;