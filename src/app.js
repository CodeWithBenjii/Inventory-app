const express = require('express');
const morgan = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const users = require('./routes/users/index');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Arp Home Inventory App',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express that will be used with RRESTFULL API',
  },
};
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js', './routes/users/*.js'],
};

const app = express();
const swaggerSpec = swaggerJSDoc(options);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', users);
module.exports = app;
