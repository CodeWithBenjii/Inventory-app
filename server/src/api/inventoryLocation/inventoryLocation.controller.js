const Joi = require('joi');
const Location = require('./inventoryLocation.model');

const getAllLocations = async () => {
  try {
    const value = await Location.query().select();
    return value;
  } catch (error) {
    return {
      msg: 'Error Getting All Addresses.',
      errCode: 403,
    };
  }
};

const getLocationById = async (id) => {
  try {
    const value = await Location.query().findById(id);
    if (value.length === 0) {
      throw new Error('address not found.');
    }
    return value;
  } catch (error) {
    return {
      msg: 'Error Getting the address with id.',
      errCode: 403,
    };
  }
};

const createLocation = async (data) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      image_url: Joi.string().required(),
    });
    const { error } = schema.validate(data);
    if (error) {
      return {
        msg: 'Invalid body.',
        errCode: 403,
      };
    }
    const value = await Location.query().insert(data);
    return value;
  } catch (error) {
    return {
      msg: 'Error Creating Location.',
      errCode: 403,
    };
  }
};

module.exports = {
  getAllLocations,
  getLocationById,
  createLocation,
};
