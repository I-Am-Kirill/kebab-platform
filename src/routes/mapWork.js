import express from 'express';
import axios from 'axios';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { order } from '../db/models';
import Layout from '../components/Layout';

const route = express.Router();

route.get('/mapDistance', async (req, res) => {
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
    return res.json({ distance });
  } catch (err) {
    console.log(err);
  }
});

route.post('/mapCoordinates', async (req, res) => {
  try {
    const adress = 'Москва, Садовническая, 25';

    const url = encodeURI(`https://catalog.api.2gis.com/3.0/items/geocode?q=${adress}&fields=items.point&key=ruxkjk8859`);
    const coordinates = await axios.get(url);
    const coordLat = coordinates.data.result.items[0].point.lat;
    const coordLon = coordinates.data.result.items[0].point.lon;
    console.log(coordinates.data.result.items[0].point);
    console.log(coordLat, coordLon);
    return res.json({ coordLat, coordLon });
  } catch (err) {
    console.log(err);
  }
});

const options = {};
function gotPos(position) {
  const coordPosition = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };
  console.log(coordPosition);
}
function posFail(error) {
  const errors = { 1: 'No permision', 2: 'Unable to determine position', 3: 'Took too long' };
  console.log(errors);
}

route.get('/mapPosition', async (req, res) => {
  try {
    if (navigator.geolocation) {
      const giveUp = 1000 * 30;
      const tooOld = 1000 * 60 * 60;
      const posCallback = (position) => {
        console.log(position);
      };
      options = {
        enableHighAccuracy: true,
        timeout: giveUp,
        maximumAge: tooOld,
      };
      // navigator.geolocation.getCurrentPosition(options, (position) => {});
      // const navi = navigator.geolocation;
      // navi.geolocation.getCurrentPosition(posCallback, posFail, options);
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log({ latitude, longitude });
      });
    }
  } catch (err) {
    console.log(err);
  }
});
export default route;
