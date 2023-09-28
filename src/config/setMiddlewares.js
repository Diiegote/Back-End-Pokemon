const { json, urlencoded } = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { NODE_ENV } = require('./envs');

module.exports = (server) => {
   server.use(urlencoded({ extended: true }));
   server.use(json());
   server.use(cors());
   NODE_ENV == "development" && server.use(morgan("dev"));
   server.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', "*");
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
      next();
   });
}