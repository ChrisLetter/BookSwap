// const express = require('express');
import express from 'express';
import cors from 'cors';
import router from './router';
import * as dotenv from 'dotenv'

dotenv.config()

const options = {
  origin: '*',
  credentials: true,
};

const app = express();

app
  .use(cors(options))
  .use(express.json())
  .use(router)
  .listen(process.env.PORT);
