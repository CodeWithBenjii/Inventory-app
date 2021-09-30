const express = require('express');
const Joi = require('joi');

const router = express.Router();
const State = require('./state.model');

router.get('/', async (req, res) => {
  const state = await State.query().select('id', 'name', 'code');
  res.json(state);
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
  const state = await State.query().insert(req.body);
  res.json(state);
});

module.exports = router;
