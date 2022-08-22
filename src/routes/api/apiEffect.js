import express from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';
import axios from 'axios';
import { order, basket, list } from '../../db/models';

const route = express.Router();

route.get('/orders', async (req, res) => {
  try {
    const order1 = await order.findAll();
    let pointStart = {};
    // console.log(req);
    if (req.session.hasOwnProperty('userSession')) {
      pointStart = {
        lat: req.session.userSession.lat,
        lon: req.session.userSession.lon,
      };
    } else {
      pointStart = {
        lat: 55.755864,
        lon: 37.617698,
      };
    }
    for (let i = 0; i < order1.length; i++) {
      const pointEnd = {
        lat: order1[i].dataValues.lat,
        lon: order1[i].dataValues.lon,
      };
      //   console.log('27 headerList', pointStart, pointEnd);

      //   const getDistance = await axios.post(
      //     'https://routing.api.2gis.com/get_dist_matrix?key=07916d49-e084-453b-956c-bcb324ed1487&version=2.0',
      //     {
      //       points: [
      //         pointStart,
      //         pointEnd,
      //       ],
      //       sources: [
      //         0,
      //       ],
      //       targets: [
      //         1,
      //       ],
      //     },
      //   );
      //   const { distance } = getDistance.data.routes[0];
      //   order1[i].dataValues.distance = distance;
      order1[i].dataValues.distance = 15;
      //
      //
      // console.log(getDistance.data);
      // console.log(distance);
      res.json(order1);
    }
  } catch (error) {
    console.log(error);
  }
});

route.get('/students/:id', async (req, res) => {
  const { id } = req.params;
  const student = await Student.findByPk(id);
  res.json(student);
});

route.get('/details/:id', async (req, res) => {
  const { id } = req.params;
  const orderid = await order.findByPk(id);
  res.json(orderid);
});

route.get('list/:id', async (req, res) => {
  const { id } = req.params;
  // const initState = { path: req.originalUrl };
  const listid = await list.findAll({ where: { worker: id } });
  res.json(listid);
});

route.get('basket/:id', async (req, res) => {
  const { id } = req.params;
  const basketid = await basket.findAll({ where: { user: id } });
  res.json(basketid);
});

module.exports = route;
