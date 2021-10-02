const express = require('express');
const InvLocation = require('./inventoryLocation.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const Location = await InvLocation.query().select('name', 'description', 'image_url');
  res.json(Location);
});

router.post('/', (req, res) => {
  res.send('Inventory Location');
});

module.exports = router;
