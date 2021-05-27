/**
 * @file constants.js
 * @author: Bismark
 * @version: 1.0
 * createdDate: 05/27/2021
 */

// internal app code
const APP_CODE = Object.freeze({
  SUCCESS: 100,
  UNAUTHORIZED: 101,
  INVALID_CREDENTIAL: 102,
  INVALID_TOKEN: 103,
  MISSING_TOKEN: 104,
  BEARER_TOKEN: 105,
  UNKNOWN_ERROR: -1,
});

// HTTP Status codes
const HTTP_CODE = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  CONFLICT: 409,
  FAILED: 500,
};

// Error names maped to a type
const errorName = {
  INVALID_TOKEN: 'INVALID_TOKEN',
  MISSING_TOKEN: 'MISSING_TOKEN',
  UNAUTHORIZED: 'UNAUTHORIZED',
  BEARER_TOKEN: 'BEARER_TOKEN',
  INVALID_CREDENTIAL: 'INVALID_CREDENTIAL',
};

// Error object contaninng details of the error
const errorType = {
  UNAUTHORIZED: {
    message: 'Not authorized.',
    statusCode: HTTP_CODE.UNAUTHORIZED,
    code: APP_CODE.UNAUTHORIZED,
  },
  INVALID_TOKEN: {
    message: 'Token invalid or expired.',
    statusCode: HTTP_CODE.UNAUTHORIZED,
    code: APP_CODE.INVALID_TOKEN,
  },
  MISSING_TOKEN: {
    message: 'Authorization header must be provided.',
    statusCode: HTTP_CODE.UNAUTHORIZED,
    code: APP_CODE.MISSING_TOKEN,
  },
  BEARER_TOKEN: {
    message: 'Authentication token must be Bearer [token].',
    statusCode: HTTP_CODE.UNAUTHORIZED,
    code: APP_CODE.BEARER_TOKEN,
  },
  INVALID_CREDENTIAL: {
    message: 'Credentials invalid.',
    statusCode: HTTP_CODE.BAD_REQUEST,
    code: APP_CODE.INVALID_CREDENTIAL,
  },
};

module.exports = {
  HTTP_CODE,
  APP_CODE,
  errorName,
  errorType,
};
