/**
 * @file listing.test.js
 * @author: Bismark
 * @version: 1.0
 * createdDate: 05/27/2021
 */

const supertest = require('supertest');
const LOGGER = require('../src/logger/logger');
const { LISTINGS, LOGIN } = require('./queries');
const listingService = require('../src/resolvers/resolvers');
const server = require('../server');
const request = supertest(server); // start our test server

/**
 *  @description Sample test run to validate user login and resolvers.
 */
describe('Running Listing Test', () => {
  let user; // this user should have a bearer token
  beforeEach(async () => {
    // this will run before each test
    user = await listingService.Mutation.login(null, {
      email: 'user1@sideinc.com',
      password: '676cfd34-e706-4cce-87ca-97f947c43bd4',
    });
  });
  // test mutation function for login
  test('Login Resolver function', async () => {
    const res = await listingService.Mutation.login(null, {
      email: 'user1@sideinc.com',
      password: '676cfd34-e706-4cce-87ca-97f947c43bd4',
    });
    LOGGER.debug('User: ', res);
    expect(res.user.email).toBeDefined(); // I expect the data to have an email
  });

  // test graph query for login
  test('Login Query', () =>
    new Promise((done) => {
      request
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({
          query: `${LOGIN}`,
          variables: { email: 'user1@sideinc.com', password: '676cfd34-e706-4cce-87ca-97f947c43bd4' },
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toBeInstanceOf(Object); // return value should be an object
          expect(res.body.data.login.user.email).toBeDefined(); // return value should have a user object with an email
          done();
        });
    }));

  // test graph query for the listing property
  test('Listing Query', () =>
    new Promise((done) => {
      request
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${user.tokens.accessToken}`) // token extracted from the logged in user
        .send({
          query: `${LISTINGS}`,
          variables: { city: 'houston' },
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          LOGGER.debug(JSON.stringify(res.body));
          expect(res.body).toBeInstanceOf(Object); // return value should be an object
          done();
        });
    }));
});
