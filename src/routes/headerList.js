import express from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';
import axios from 'axios';
import { order, basket, list } from '../db/models';
import Layout from '../components/Layout';

const route = express.Router();

route.get('/', async (req, res) => {
  try {
    const initState = { path: req.originalUrl, userSession: req.session.userSession };
    // const initState = { path: req.originalUrl };
    const order1 = await order.findAll();
    const latitude = req.session.userSession.lat;
    const longitude = req.session.userSession.lon;
    // console.log('17 headerList', latitude, longitude);
    const pointStart = {
      lat: req.session.userSession.lat,
      lon: req.session.userSession.lon,
    };
    for (let i = 0; i < order1.length; i++) {
      const pointEnd = {
        lat: order1[i].dataValues.lat,
        lon: order1[i].dataValues.lon,
      };
      // console.log('27 headerList', pointStart, pointEnd);
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
      // console.log(getDistance.data);
      const { distance } = getDistance.data.routes[0];
      // console.log(distance);
      order1[i].dataValues.distance = distance;
    }
    // order1.map((el) => (order1[el].dataValues.distance = el));

    // order1[0].distance = 5;

    // // return res.json({ distance });

    // console.log(order1);
    initState.order = order1;
    const html = renderToString(<Layout initState={initState} />);
    res.write('<!DOCTYPE html>');
    res.end(html);
  } catch (err) {
    console.log(err);
  }
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
  try {
    const initState = { path: req.originalUrl, userSession: req.session.userSession };
    // const initState = { path: req.originalUrl };
    const order1 = await order.findAll();
    initState.order = order1;
    const html = renderToString(<Layout initState={initState} />);
    res.write('<!DOCTYPE html>');
    res.end(html);
  } catch (err) {
    console.error(err);
  }
});
route.post('/addProdukt', async (req, res) => {
  try {
    const initState = { path: req.originalUrl, userSession: req.session.userSession };
    const address = req.body.location;
    const url = encodeURI(`https://catalog.api.2gis.com/3.0/items/geocode?q=${address}&fields=items.point&key=ruxkjk8859`);
    const coordinates = await axios.get(url);
    const { lat } = coordinates.data.result.items[0].point;
    const { lon } = coordinates.data.result.items[0].point;
    req.body.lat = lat;
    req.body.lon = lon;
    // console.log(req.body);
    await order.create(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
});

route.post('/toBasket', async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err);
  }
});

route.post('/toList', async (req, res) => {
  const initState = { path: req.originalUrl, userSession: req.session.userSession };
  const arr = await req.body;
  for (let i = 0; i < arr.length; i++) {
    list.create(arr[i]);
  }
  res.sendStatus(200);
});

export default route;
