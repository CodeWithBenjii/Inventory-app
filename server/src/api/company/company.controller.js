const Company = require('./company.model');

const getAllComapnies = async () => {
  try {
    const companies = await Company.query().withGraphJoined('[Address]');
    return companies;
  } catch (error) {
    return {
      msg: 'Error Getting All Companies.',
      errCode: 403,
    };
  }
};

const getACompany = async (id) => {
  try {
    const company = await Company.query().findById(id).withGraphJoined('[Address]');
    return company;
  } catch (error) {
    return {
      msg: 'Error Getting Company By Id.',
      errCode: 403,
    };
  }
};

const createCompany = async (company) => {
  try {
    const newCompany = await Company.query().insert(company);
    return newCompany;
  } catch (error) {
    return {
      msg: 'Error Creating Company.',
      errCode: 403,
    };
  }
};

module.exports = {
  getACompany,
  getAllComapnies,
  createCompany,
};
