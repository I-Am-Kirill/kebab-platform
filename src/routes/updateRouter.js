import express from 'express';
import React from 'react';
import Layout from '../components/Layout';
import { order } from '../db/models';
import { renderToString } from 'react-dom/server';

const route = express.Router();


route.post('/:id', async (req, res) => {
  const entry = await order.findOne({ where: { id: req.params.id } });
  const { name, location, img, price, discont } = req.body;
  entry.name= name;
  entry.location = location;
  entry.img = img;
  entry.price = price;
  entry.discont = discont;
  entry.save();
  return res.redirect(`/details/${entry.id}`);
});

route.get('/:id', (req, res) => {
  const initState = { path: req.originalUrl };
  const layout = React.createElement(Layout, { initState });
  const html = renderToString(layout);
  res.write('<!DOCTYPE html>');
  res.end(html);
});



export default route;