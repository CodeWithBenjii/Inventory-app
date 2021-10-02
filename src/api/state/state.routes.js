const express = require('express');

const router = express.Router();
const stateController = require('./state.controller');

router.get('/', async (req, res) => {
  const result = await stateController.getAllStates();
  if (result.errCode) {
    res.status(result.errCode).json(result);
    return;
  }
  res.json(result);
});

router.post('/', async (req, res) => {
  const result = await stateController.createState(req.body);
  if (result.errCode) {
    res.status(result.errCode).json(result);
    return;
  }
  res.json(result);
});

router.get('/:id', async (req, res) => {
  const result = await stateController.getStateById(req.params.id);
  if (result.errCode) {
    res.status(result.errCode).json(result);
    return;
  }
  res.json(result);
});

module.exports = router;
