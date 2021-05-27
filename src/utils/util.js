/**
 * @file utils.js
 * @author: Bismark
 * @version: 1.0
 * createdDate: 05/27/2021
 */
const FILE_NAME = 'userService.js';
const axios = require('axios').default;
const LOGGER = require('../logger/logger');
const { errorName } = require('../constants/constant');
const applicationPropertiesSingleton = require('../modules/applicationPropertiesSingleton');
const baseUrl = applicationPropertiesSingleton.VAR_MLS_URL;
const username = applicationPropertiesSingleton.VAR_BASIC_USERNAME;
const password = applicationPropertiesSingleton.VAR_BASIC_PASSWORD;
const bearerEmail = applicationPropertiesSingleton.VAR_BEARER_EMAIL;
const bearerPassword = applicationPropertiesSingleton.VAR_BEARER_PASSWORD;

// Authentication type is Basic. Username/password will be encorded to base64
const authorize = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

/**
 * @description This function makes a request to SimplyRESTS API
 * @memberof utils
 * @function restClient
 * to fetch a list of properties for a city
 * @param {Object} paramter containing the city name
 */
async function restClient(parameter) {
  try {
    const config = {
      // header containing the encorded base64 use to authorize our request
      headers: {
        Authorization: authorize,
      },
      params: parameter,
    };
    const response = await axios.get(baseUrl, config);
    // we only return data for a 200 status
    return response.status === 200 ? response.data : null;
  } catch (error) {
    LOGGER.error(`Error occrued at fetchProperties: ${FILE_NAME} ${error}`);
    return error;
  }
}

/**
 * @description This function returns back an email if the value for email/password matches
 * @param {String} email users email
 * @param {String} password users password
 */
function auth(email, pass) {
  // return the email or an exception if there was not a match
  return email === bearerEmail && pass === bearerPassword ? { email } : new Error(errorName.INVALID_CREDENTIAL);
}

module.exports = {
  restClient,
  auth,
};
