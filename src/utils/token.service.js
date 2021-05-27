/**
 * @file token.service.js
 * @author: Bismark
 * @version: 1.0
 * createdDate: 05/27/2021
 */

const moment = require('moment');
const nJwt = require('njwt');
const applicationPropertiesSingleton = require('../modules/applicationPropertiesSingleton');
const { errorName } = require('../constants/constant');
const accessTokenSecret = applicationPropertiesSingleton.VAR_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = applicationPropertiesSingleton.VAR_REFRESH_TOKEN_SECRET;

/**
 * @description Sign and generate a JWT from an email
 * @param {String} email the email use to generate the JWT
 */
const generateToken = async (email) => {
  // Token Expiry variables
  const accessTokenExpires = moment().add(1, 'hours');
  const refreshTokenExpires = moment().add(2, 'days');

  // payload for signing the accesstokens
  const payload = {
    iss: 'http://side.com/',
    sub: email,
    scope: 'self',
  };

  // create access token
  const accesstoken = nJwt.create(payload, accessTokenSecret); // generate access token
  accesstoken.setExpiration(accessTokenExpires); // set the expiration time on this access token

  // generate refresh token
  const refreshToken = nJwt.create(payload, refreshTokenSecret);
  refreshToken.setExpiration(refreshTokenExpires); // set the expiration time on this refresh token

  return {
    accessToken: accesstoken.compact(),
    expiresAt: accessTokenExpires.toDate(),
    refresh: {
      token: refreshToken.compact(),
      expiresAt: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * @description Verify JWT and return its details.
 * @memberof token.service
 * @function verifyToken
 * @param {Object} context req to read the token
 */
async function verifyToken(context) {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        return nJwt.verify(token, accessTokenSecret);
      } catch (error) {
        throw new Error(errorName.INVALID_TOKEN);
      }
    }
    throw new Error(errorName.BEARER_TOKEN);
  }
  throw new Error(errorName.MISSING_TOKEN);
}

module.exports = {
  generateToken,
  verifyToken,
};
