import express = require('express');
import cors = require('cors');
import router = require('./router');
require('dotenv').config();
const PORT = process.env.SERVER_PORT;
const options = {
  origin: '*',
  credentials: true,
};

const app = express();

app
  .use(cors(options))
  .use(express.json())
  .use(router)
  .listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
