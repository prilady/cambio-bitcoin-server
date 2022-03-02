const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "bpi" type defines the queryable fields for every bpi in our data source.
  type Time {
    updated: String
  }
  type USD {
      rate: String
  }

  type GBP {
    rate: String
  }

  type USR {
    rate: String
  }

  type Bpi {
    USD: [USD]
    GBP: [GBP]
    USR: [USR]
  } 

  type Data {
    time: [Time]
    bpi: [Bpi]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "bpi" query returns an array of zero or more Bpis (defined above).
  type Query {
    data: [Data] 
  }
`;

// const books = [
//     {
//       title: 'The Awakening',
//       author: 'Kate Chopin',
//     },
//     {
//       title: 'City of Glass',
//       author: 'Paul Auster',
//     },
//   ];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves bpis from the "bpis" array above.

//const response = makeGetRequest();

const axios = require('axios');
async function makeGetRequest() {

  let res = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
  console.log(res.data);
  return res.data;
  
}

const resolvers = {
  Query: {
    data: async () => await makeGetRequest(),
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
