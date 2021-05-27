# Graphql take home Server
___
Use for fetching property listings for a particular city.

# Basic Flow 👍
- First step was to have a generic function that makes a request to simplyRest API using basic HTTP authentication i.e username/password.
- Next was a service function (listingService.js) which recieves the data from simplyRest via our restClient.js
- The /graphql endpoint is protected with Bearer authentication.
- Before resolving the data, we check if there's a token passed in the header and whether its not expired.
- The JWT is singed and issued by an email during login which then expires within an hour.
- Finally our graphql resolver returns the data passed by listingService.js.

# Features
- Supports Authentication via **JWT**
- External REST calls via **axios**
- Linting via **eslint**
- Integration test running via **Jest** with coverage reporting
- Graphql server via **apollo-server-express**
- Precommit hooks via **husky**

# Install and Use
- Start by cloning this repository

then

# change directory to project root
- cd graphql-take-home-assignment-core-main
- generate a .env file or a launch.json file (if you want to run in debug mode) with the below keys

```
NODE_ENV=development
WEBSITES_PORT= {PORT}
WEBSITES_ACCESS_TOKEN_SECRET={JWT_SECRET_KEY}
WEBSITES_REFRESH_TOKEN_SECRET={JWT_REFRESH_TOKEN_KEY}
WEBSITES_BASIC_USERNAME={SIMPLE_REST_USERNAME}
WEBSITES_BASIC_PASSWORD={SIMPLE_REST_PASSWORD}
WEBSITES_MLS_URL={SIMPLE_REST_MLS_URL}
WEBSITES_BEARER_EMAIL{BEARER_EMAIL}
WEBSITES_BEARER_PASSWORD={BEARER_PASSWORD}
```

# Install dependencies
- npm i

# Start server
- npm start or nodemon server.json
- if you are using VSCode launch.json - Press F5

  
# Folder Structure
- constant - for resuable values that won't change
- logger - for generating a log file and desplaying logging info
- modules - holds values that are used globally such as port number, jwt secret keys...ect
- resolvers - hold the function responsible for returning data when requested (mutations, queries)
- services - hold our business logic for user login and fetching listings
- types - holds the schema details
- utils - hold all the resuable functions for authentication/verification
- test - for running unit test cases  

# Eample query
Query for a listings
```
query listings($city: String!){
  fetchListings(city: $city){
    property{
      roof
      style
    }
    mlsId
    address{
     state
      postalCode
      country
      streetName
      city
    }
  } 
}
```
# Mutation sample
```
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
```
