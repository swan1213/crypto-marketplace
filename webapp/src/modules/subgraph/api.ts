import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { BlockNumberType, BreedingFeeType } from './types';

const API_URL = process.env.REACT_APP_SUBGRAPH_URL as string

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache'
    }
  }
})

class SubgraphAPI {
  getBlockNumber = async () => {
    const query = gql`
      {
        _meta {
          block {
            number
          }
        }
      }
    `

    return client.query<BlockNumberType>({
      query,
    })
  }

  getBredingFee = async () => {
    const query = gql`
      {
        breedingCentres {
            breedingFee
        }
      }
    `

    return client.query<BreedingFeeType>({
      query
    })
  }
}

export const subgraphAPI = new SubgraphAPI()
