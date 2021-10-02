const express = require('express');

const router = express.Router();
const CountriesController = require('./counties.controller');

router.get('/', async (req, res) => {
  const result = await CountriesController.getAllCounties();
  if (result.errCode) {
    res.status(result.errCode).json(result);
    return;
  }
  res.json(result);
});

router.post('/', async (req, res) => {
  const result = await CountriesController.createCountry(req.body);
  if (result.errCode) {
    res.status(result.errCode).json(result);
    return;
  }
  res.json(result);
});

router.get('/:id', async (req, res) => {
  const result = await CountriesController.getCountryById(req.params.id);
  if (result.errCode) {
    res.status(result.errCode).json(result);
    return;
  }
  res.json(result);
});

module.exports = router;
