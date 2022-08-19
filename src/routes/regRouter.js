import express from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';
import Layout from '../components/Layout';

const route = express.Router();
// /registration
route.get('/', async (req, res) => {
  const initState = { path: req.originalUrl, userSession: req.session.userSession };
  // const initState = { path: req.originalUrl };
  const html = renderToString(<Layout initState={initState} />);
  res.write('<!DOCTYPE html>');
  res.end(html);
});

export default route;