import express from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { list } from '../db/models';
import Layout from '../components/Layout';

const route = express.Router();

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  const initState = { path: req.originalUrl, userSession: req.session.userSession };
  // const initState = { path: req.originalUrl };
  const listid = await list.findAll({ where: { worker: id } });
  initState.listid = listid;
  const html = renderToString(<Layout initState={initState} />);
  res.write('<!DOCTYPE html>');
  res.end(html);
});

export default route;
