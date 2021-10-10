const express = require('express');
const InvLocationController = require('./inventoryLocation.controller');

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await InvLocationController.getAllLocations();
  if (result.errCode) {
    res.status(result.errCode).json(result);
    return;
  }
  res.json(result);
});
router.get('/:id', async (req, res) => {
  const result = await InvLocationController.getLocationById(req.params.id);
  if (result.errCode) {
    res.status(result.errCode).json(result);
    return;
  }
  res.json(result);
});

router.post('/', async (req, res) => {
  const result = await InvLocationController.createLocation(req.body);
  if (result.errCode) {
    res.status(result.errCode).json(result);
    return;
  }
  res.json(result);
});

module.exports = router;
