import express from "express";
import { renderToString } from "react-dom/server";
import React from "react";
import { order } from "../db/models";
import Layout from "../components/Layout";

const route = express.Router();

export default route;
