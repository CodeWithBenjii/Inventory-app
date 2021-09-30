const express = require('express');
const Joi = require('joi');

const router = express.Router();
const Country = require('./country.model');

router.get('/', async (req, res) => {
  const countries = await Country.query().select('id', 'name', 'code');
  res.json(countries);
});

router.post('/', async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    code: Joi.string().min(2).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  const country = await Country.query().insert(req.body);
  res.json(country);
});

module.exports = router;
