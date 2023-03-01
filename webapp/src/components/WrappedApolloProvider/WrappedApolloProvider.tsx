import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client'

import { Props } from './WrappedApolloProvider.types'

function getClient(uri: string) {
  return new ApolloClient({
    uri,
    cache: new InMemoryCache({})
  });
}

const WrappedApolloProvider = (props: Props) => {
  const uri = process.env.REACT_APP_SUBGRAPH_URL as string
  const client = getClient(uri)

  return (
    <ApolloProvider client={client}>{props.children}</ApolloProvider>
  )
}

export default WrappedApolloProvider
