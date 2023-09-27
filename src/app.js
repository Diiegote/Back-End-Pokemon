const express = require('express');
const routes = require('./routes/index.js');
const setMiddlewares = require('./config/setMiddlewares.js');

require('./db.js');

const server = express();
setMiddlewares(server);

server.name = 'API';

server.use('/', routes);

server.use((err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
