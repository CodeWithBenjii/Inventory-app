const express = require('express');
const Shape = require('./shape.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const shape = await Shape.query().select('id', 'name');
  res.json(shape);
});

router.post('/', async (req, res) => {
  const shape = await Shape.query().insert({ name: req.body.name });
  res.json(shape);
});

module.exports = router;
