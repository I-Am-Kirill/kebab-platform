import express from 'express';
import axios from 'axios';
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

route.get('/details/:id', async (req, res) => {
  const { id } = req.params;
  // const initState = { path: req.originalUrl, userSession: req.session.userSession };
  const initState = { path: req.originalUrl };
  const orderid = await order.findByPk(id);
  initState.student = orderid;
  const html = renderToString(<Layout initState={initState} />);
  res.write('<!DOCTYPE html>');
  res.end(html);
});

route.get('/addProdukt', async (req, res) => {
  // const initState = { path: req.originalUrl, userSession: req.session.userSession };
  const initState = { path: req.originalUrl };
  const order1 = await order.findAll();
  initState.order = order1;
  const pointStart = {
    lat: 54.99770587584445,
    lon: 82.79502868652345,
  };
  const pointEnd = {
    lat: 55.072470687600536,
    lon: 83.04634094238281,
  };
  try {
    const getDistance = await axios.post(
      'https://routing.api.2gis.com/get_dist_matrix?key=07916d49-e084-453b-956c-bcb324ed1487&version=2.0',
      {
        points: [
          pointStart,
          pointEnd,
        ],
        sources: [
          0,
        ],
        targets: [
          1,
        ],
      },
    );
    const { distance } = getDistance.data.routes[0];
    console.log(distance);
    const adress = 'Москва, Садовническая, 25';
    const url = encodeURI(`https://catalog.api.2gis.com/3.0/items/geocode?q=${adress}&fields=items.point&key=ruxkjk8859`);
    const coordinates = await axios.get(url);
    const coordLat = coordinates.data.result.items[0].point.lat;
    const coordLon = coordinates.data.result.items[0].point.lon;

    console.log(coordLat, coordLon);
    console.log(coordinates.data.result.items[0].point);
  } catch (err) {
    console.log(err);
  }
  const html = renderToString(<Layout initState={initState} />);
  res.write('<!DOCTYPE html>');
  res.end(html);
});
route.post('/addProdukt', async (req, res) => {
  await order.create(req.body);
  res.sendStatus(200);
});

export default route;
