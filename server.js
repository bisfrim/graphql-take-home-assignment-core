/**
 * @file server.js
 * @author: Bismark
 * @version: 1.0
 * createdDate: 05/27/2021
 */
const express = require('express');
const compression = require('compression');
const { ApolloServer } = require('apollo-server-express');
const { errorType } = require('./src/constants/constant');
const LOGGER = require('./src/logger/logger');
const applicationPropertiesSingleton = require('./src/modules/applicationPropertiesSingleton');
const app = express();
const appPort = applicationPropertiesSingleton.VAR_APP_PORT;
const resolvers = require('./src/resolvers/resolvers');
const typeDefs = require('./src/types/index');

app.use(compression()); // compress response bodies
// custom errors returned by this function
const getErrorCode = (errorName) => errorType[errorName];

const server = new ApolloServer({
  typeDefs: typeDefs, // graphql schema
  resolvers, // grahql resolvers
  playground: true,
  context: ({ req }) => ({ req }),
  formatError: (err) => {
    const error = getErrorCode(err.message);
    return { message: error.message, statusCode: error.statusCode, code: error.code };
  },
});
server.applyMiddleware({ app, path: '/graphql' });
app.listen({ port: appPort }, () => LOGGER.debug(`Listening on http://localhost:4000/graphql`));

module.exports = app;
