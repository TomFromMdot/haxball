import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../../global/types/graphql';

const client = new GraphQLClient('https://api.yourdomain.com/graphql', {
  headers: {
    authorization: `Bearer ${process.env.TOKEN}`,
  },
});

const sdk = getSdk(client);

export default sdk;
