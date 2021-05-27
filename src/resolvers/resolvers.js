/**
 * @file resolvers.js
 * @author: Bismark
 * @version: 1.0
 * createdDate: 05/27/2021
 */

const listingResolvers = require('../services/listingService');

module.exports = {
  Query: {
    ...listingResolvers.Query,
  },
  Mutation: {
    ...listingResolvers.Mutation,
  },
};
