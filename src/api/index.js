const express = require('express');

const users = require('./users/users.routes');
const countries = require('./country/country.routes');
const states = require('./state/state.routes');

const router = express.Router();

router.use('/users', users);
router.use('/countries', countries);
router.use('/states', states);

module.exports = router;
