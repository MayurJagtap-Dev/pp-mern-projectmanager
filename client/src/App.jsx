import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Header from "./components/Header";
import Client from "./components/Client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: cache,
});

export default function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div class="grid bg-white">
          <Client />
        </div>
      </ApolloProvider>
    </>
  );
}
