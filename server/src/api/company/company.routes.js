const express = require('express');
const CompanyController = require('./company.controller')

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await CompanyController.getAllComapnies();
  if (result.errCode) {
    res.status(result.errCode).json(result);
    return;
  }
  res.json(result);
});

router.get('/:id', async (req, res) => {
  const result = await CompanyController.getACompany(req.params.id);
  if (result.errCode) {
    res.status(result.errCode).json(result);
    return;
  }
  res.json(result);
});

router.post('/', async (req, res) => {
  const result = await CompanyController.createCompany(req.body);
  if (result.errCode) {
    res.status(result.errCode).json(result);
    return;
  }
  res.json(result);
})
module.exports = router;
