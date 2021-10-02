const Joi = require('joi');
const Country = require('./counties.model');

const createCountry = async (country) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    code: Joi.string().min(2).required(),
  });

  try {
    const value = await schema.validateAsync(country);
    const newCountry = await Country.query().insert(value);
    return newCountry;
  } catch (err) {
    return {
      msg: 'Error validating country.',
      errCode: 400,
    };
  }
};

const getAllCounties = async () => {
  try {
    const country = await Country.query().select('id', 'name', 'code');
    return country;
  } catch (error) {
    return {
      msg: 'Error Getting All countries.',
      errCode: 403,
    };
  }
};

const getCountryById = async (id) => {
  try {
    const country = await Country.query().select('id', 'name', 'code').where('id', id);
    if (country.length === 0) {
      throw new Error('country not found.');
    }
    return country[0];
  } catch (error) {
    return {
      msg: 'Error Getting country by id. Please Ensure you have the correct ID',
      errCode: 403,
    };
  }
};

module.exports = { getAllCounties, getCountryById, createCountry };
