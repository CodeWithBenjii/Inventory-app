const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const users = require('./api/index');

const app = express();
app.use(morgan('dev'));
app.use(compression());
app.use(helmet());
app.use(express.json());

app.use('/api/v1/', users);
module.exports = app;
