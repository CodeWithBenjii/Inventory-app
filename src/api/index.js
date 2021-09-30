const express = require('express');

const users = require('./users/users.routes');
const countries = require('./Counties/country.routes');
const states = require('./state/state.routes');
const address = require('./address/address.routes');
const company = require('./company/company.routes');

const router = express.Router();

router.use('/users', users);
router.use('/countries', countries);
router.use('/states', states);
router.use('/address', address);
router.use('/company', company);

module.exports = router;
