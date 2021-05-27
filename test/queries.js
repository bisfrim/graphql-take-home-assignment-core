/**
 * @file queries.js
 * @author: Bismark
 * @version: 1.0
 * @usage: use to define graphl query
 * createdDate: 05/27/2021
 */

// graphl query - filter listings by city name
const LISTINGS = `
  query listings($city: String!) {
    fetchListings(city: $city) {
      property {
        roof
        style
      }
      mlsId
      address {
        state
        postalCode
        country
        city
      }
    }
  }
`;

// graphl mutation - login by email/password
const LOGIN = `
  mutation userLogin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        email
      }
      tokens {
        accessToken
        expiresAt
        refresh {
          expiresAt
          token
        }
      }
    }
  }
`;

module.exports = {
  LISTINGS,
  LOGIN,
};
