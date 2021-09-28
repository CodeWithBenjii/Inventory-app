require('dotenv').config();

module.exports = {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
};
