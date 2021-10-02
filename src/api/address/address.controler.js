const Joi = require('joi');
const Address = require('./address.model');
require('dotenv').config();

const createAddress = async (address) => {
  const schema = Joi.object({
    address_line_1: Joi.string().required(),
    address_line_2: Joi.string(),
    city: Joi.string().required(),
    state_id: Joi.number().required(),
    country_id: Joi.number().required(),
    zip_code: Joi.string().required(),
    longitude: Joi.string(),
    latitude: Joi.string(),
  });
  try {
    const value = await schema.validateAsync(address);
    // Todo : use Third party Service to Validate the address is a valid address.
    // Will Most likely Only being able to validate Australian addresses for now.
    const newAddress = await Address.query().insert(value);
    return newAddress;
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      return err;
    }
    return {
      msg: 'Error Validating The Address.',
      errCode: 400,
    };
  }
};

const getAllAddresses = async () => {
  try {
    const value = await Address.query().select().withGraphJoined('[state, country]');
    return value;
  } catch (error) {
    return {
      msg: 'Error Getting All Addresses.',
      errCode: 403,
    };
  }
};

const getAddressById = async (id) => {
  try {
    const value = await Address.query().findById(id).select().withGraphJoined('[state, country]');
    if (value.length === 0) {
      throw new Error('address not found.');
    }
    return value;
  } catch (error) {
    return {
      msg: 'Error Getting address by id. Please Ensure you have the correct ID',
      errCode: 403,
    };
  }
};

module.exports = { createAddress, getAllAddresses, getAddressById };
