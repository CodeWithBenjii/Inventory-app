const express = require('express');
const Joi = require('joi');
const Address = require('./address.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const address = await Address.query().select().withGraphJoined('[state, country]');
  res.json(address);
});

router.post('/', async (req, res) => {
  const schema = Joi.object({
    address_line_1: Joi.string().required(),
    address_line_2: Joi.string(),
    city: Joi.string().required(),
    state_id: Joi.number().required(),
    country_id: Joi.number().required(),
    zip_code: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  try {
    const address = await Address.query().insert(req.body);
    res.json(address);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
