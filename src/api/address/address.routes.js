const express = require('express');
const AddressController = require('./address.controler');

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await AddressController.getAllAddresses();
  if (result.errCode) {
    res.status(result.errCode).json(result);
    return;
  }
  res.json(result);
});

router.post('/', async (req, res) => {
  const result = await AddressController.createAddress(req.body);
  if (result.errCode) {
    res.status(result.errCode).json(result);
    return;
  }
  res.json(result);
});

router.get('/:id', async (req, res) => {
  const result = await AddressController.getAddressById(req.params.id);
  if (result.errCode) {
    res.status(result.errCode).json(result);
    return;
  }
  res.json(result);
});

module.exports = router;
