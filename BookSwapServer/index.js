const express = require('express');
const cors = require('cors');
const router = require('./router.js');
const PORT = 3000;
const options = {
  origin: '*',
  credentials: true,
};

console.log('PORT');

console.log('TEST SOMETHING')

const app = express();

app
  .use(cors(options))
  .use(express.json())
  .use(router)
  .listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
