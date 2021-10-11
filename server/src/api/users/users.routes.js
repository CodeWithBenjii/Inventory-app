const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('./users.model');

router.get('/', async (req, res) => {
  const users = await User.query()
    .select('id', 'email', 'name', 'created_at', 'updated_at')
    .where('deleted_at', null);
  res.json(users);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.query()
    .select('id', 'email', 'name', 'password')
    .where('email', email)
    .first();
    console.log(user);
  if (!user) {
    res.status(400).json({ error: 'Something went wrong' });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    res.status(400).json({ error: 'Invalid password' });
  }
  const token = jwt.sign({ name: user.name, email: user.email }, process.env.JWT_SECRET);
  res.json({ authentication_token: token });
});

router.post('/register', async (req, res) => {
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
    const data = await User.query().insert({
      name: req.body.name,
      email: req.body.email,
      password: userHashedPassword,
    });
    const webToken = jwt.sign({ name: data.name, email: data.email }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });
    return res.status(200).json({ authentication_token: webToken });
  } catch (err) {
    return res.status(422).send({ Error: err.constraint });
  }
});

module.exports = router;
