const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('./users.model');

router.get('/', async (req, res) => {
  const users = await User.query()
    .select('id', 'email', 'name', 'created_at', 'updated_at')
    .where('deleted_at', null);
  res.json(users);
});

router.post('/', async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  const salt = await bcrypt.genSalt(10);
  const userHashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    await User.query().insert({
      name: req.body.name,
      email: req.body.email,
      password: userHashedPassword,
    });
    res.status(200).send({ message: 'User created successfully' });
  } catch (err) {
    res.status(422).send({ Error: err.constraint });
  }
});

module.exports = router;
