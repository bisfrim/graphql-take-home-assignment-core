/**
 * @file applicationPropertiesSingleton.js
 * @author: Bismark
 * @version: 1.0
 * Created Date: 05/27/2021
 */

const envalid = require('envalid');
const ENV_CHOICES = ['development', 'test'];
const { str, port } = envalid;

// Sanitazing env values.
const env = envalid.cleanEnv(process.env, {
  NODE_ENV: str({ choices: ENV_CHOICES }),
  WEBSITES_PORT: port(),
  WEBSITES_ACCESS_TOKEN_SECRET: str(),
  WEBSITES_REFRESH_TOKEN_SECRET: str(),
  WEBSITES_BASIC_USERNAME: str(),
  WEBSITES_BASIC_PASSWORD: str(),
  WEBSITES_MLS_URL: str(),
  WEBSITES_BEARER_EMAIL: str(),
  WEBSITES_BEARER_PASSWORD: str(),
});
/**
 * These variables are used to get environment variables from the .env file
 *
 * If you are developer, you will need to create a .env file or generate a (launch.json) file with all above keys and values.
 */
module.exports = {
  VAR_APP_PORT: env.WEBSITES_PORT,
  VAR_ACCESS_TOKEN_SECRET: env.WEBSITES_ACCESS_TOKEN_SECRET,
  VAR_REFRESH_TOKEN_SECRET: env.WEBSITES_REFRESH_TOKEN_SECRET,
  VAR_BASIC_USERNAME: env.WEBSITES_BASIC_USERNAME,
  VAR_BASIC_PASSWORD: env.WEBSITES_BASIC_PASSWORD,
  VAR_MLS_URL: env.WEBSITES_MLS_URL,
  VAR_BEARER_EMAIL: env.WEBSITES_BEARER_EMAIL,
  VAR_BEARER_PASSWORD: env.WEBSITES_BEARER_PASSWORD,
  VAR_LOGGER_LEVEL: 'DEBUG',
  VAR_DEBUGON: 'true',
};
