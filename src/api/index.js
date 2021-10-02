const express = require('express');

const users = require('./users/users.routes');
const countries = require('./Counties/country.routes');
const states = require('./state/state.routes');
const address = require('./address/address.routes');
const company = require('./company/company.routes');
const shape = require('./shape/shape.routes');
const inventoryLocation = require('./inventoryLocation/inventoryLocation.routes');

const router = express.Router();

router.use('/users', users);
router.use('/countries', countries);
router.use('/states', states);
router.use('/address', address);
router.use('/company', company);
router.use('/shape', shape);
router.use('/inventoryLocation', inventoryLocation);

module.exports = router;
