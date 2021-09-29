const express = require('express');
const Joi = require('joi');

const router = express.Router();
const User = require('./user.model');

router.get('/', async (req, res) => {
  const users = await User.query()
    .select('id', 'email', 'name', 'created_at', 'updated_at')
    .where('deleted_at', null);
  res.json(users);
});

router.post('/', async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  res.status(200).send({ message: 'User created successfully' });
});

module.exports = router;