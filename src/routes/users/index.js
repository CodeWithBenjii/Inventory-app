const express = require('express');
const Joi = require('joi');

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */
// eslint-disable-next-line consistent-return
router.post('/users', async (req, res) => {
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
