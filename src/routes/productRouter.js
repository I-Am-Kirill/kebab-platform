import express from 'express';
import { order } from '../db/models';


const route = express.Router();

route.get('/item/:id', async (req, res) => {
  const {id} = req.params;
  const item = await order.findByPk(id);
  console.log(item.dataValues);
  if (item) {
    res.json(item.dataValues);
  } else {
    res.sendStatus(400);
  }
});

export default route;