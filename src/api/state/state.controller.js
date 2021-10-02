const Joi = require('joi');
const State = require('./state.model');

const createState = async (state) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    code: Joi.string().min(2).max(10).required(),
  });

  try {
    const value = await schema.validateAsync(state);
    return value;
  } catch (err) {
    return {
      msg: 'Error validating State.',
      errCode: 400,
    };
  }
};

const getAllStates = async () => {
  try {
    const state = await State.query().select('id', 'name', 'code');
    return state;
  } catch (error) {
    return {
      msg: 'Error Getting All States.',
      errCode: 403,
    };
  }
};

const getStateById = async (id) => {
  try {
    const state = await State.query().select('id', 'name', 'code').where('id', id);
    if (state.length === 0) {
      throw new Error('State not found.');
    }
    return state;
  } catch (error) {
    return {
      msg: 'Error Getting state by id. Please Ensure you have the correct ID',
      errCode: 403,
    };
  }
};

module.exports = { createState, getAllStates, getStateById };
