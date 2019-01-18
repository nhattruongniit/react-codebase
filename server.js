const express = require('express');
const path = require('path');
require('dotenv').config();

const { PORT } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.info(`Server Listening At ${PORT}`);
});
