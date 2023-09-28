const express = require('express');
const routes = require('./routes/index.js');
const setMiddlewares = require('./config/setMiddlewares.js');

require('./db.js');

const server = express();
setMiddlewares(server);

server.name = 'API';

server.use('/', routes);

server.use((err, req, res, next) => {
  res.status(err?.response?.status || 500).send({
     error: true,
     message: err.message
  });

});
module.exports = server;
