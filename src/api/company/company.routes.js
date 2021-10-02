const express = require('express');
const Company = require('./company.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const companies = await Company.query().withGraphJoined('[Address]');
  res.send(companies);
});
module.exports = router;
