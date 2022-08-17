import express from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { Entry } from '../db/models';
import Layout from '../components/Layout';

const route = express.Router();

// router.get('/', async (req, res) => {
//   const entries = await Entry.findAll({ order: [['id', 'DESC']] });
//   const initState = { path: req.originalUrl, entries };
//   const layout = React.createElement(Layout, { initState });
//   const html = renderToString(layout);
//   res.send('<!DOCTYPE html>');
//   res.end(html);
// });
route.get('/', async (req, res) => {
  try {
    const initState = { path: req.originalUrl };
    const html = renderToString(<Layout initState={initState} />);
    res.write('<!DOCTYPE html>');
    res.end(html);
  } catch (err) {
    console.error(err);
  }
});

export default route;
