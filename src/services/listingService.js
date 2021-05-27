/**
 * @file listingService.js
 * @author: Bismark
 * @version: 1.0
 * createdDate: 05/27/2021
 */

const LOGGER = require('../logger/logger');
const authService = require('../utils/token.service');
const utils = require('../utils/util');
const FILE_NAME = 'listingService.js';

module.exports = {
  Query: {
    /**
     * @description This function retrieves listings for a particular city
     * @memberof MLsService
     * @function fetchListings
     * @param {String} opts paramter for a city name
     * @param {Object} _
     * @param {Object} context request shared across all resolvers
     */
    fetchListings: async (_, opts, context) => {
      try {
        LOGGER.debug(`Entring into fetchListings : ${FILE_NAME}`);
        // object passed as a query parameter to fetch a city
        const parameters = {
          q: opts.city,
        };
        await authService.verifyToken(context); // bearer token verification
        return await utils.restClient(parameters); // return the listings for a city
      } catch (error) {
        LOGGER.error(`Error whiles fetching listings: ${FILE_NAME} ${error}`);
        return error;
      }
    },
  },

  Mutation: {
    /**
     * This function validates the email/password for authenticity.
     * A JWT signed with the email will then be returned to be use for fetch a listing
     * @memberof mlsService
     * @function login
     * @param {String} email users email
     * @param {String} password users password
     */
    login: async (_, { email, password }) => {
      try {
        LOGGER.debug(`Entring into login : ${FILE_NAME}`);
        const authUser = utils.auth(email, password); // email and password validation
        const tokens = await authService.generateToken(authUser.email); // sign and generate bearer token from the email
        return {
          user: authUser,
          tokens,
        };
      } catch (error) {
        LOGGER.error(`Error occured at login: ${FILE_NAME} ${error}`);
        return error;
      }
    },
  },
};
