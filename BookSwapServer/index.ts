// const express = require('express');
import express from 'express';
import cors from 'cors';
const router = require('./router');
import * as dotenv from 'dotenv'

const filename = process.env.ENV === 'test'
  ? '.env.test'
  : '.env'
  
dotenv.config({ path: filename })


const app = express();
const options = {
  origin: '*',
  credentials: true,
};



app
  .use(cors(options))
  .use(express.json())
  .use(router)
  .listen(process.env.PORT);
