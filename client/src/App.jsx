import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Client from "./components/Client";
import Project from "./components/Project";
import AboutUs from "./components/AboutUs";
import NotFound from "./components/NotFound";

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
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<AboutUs />} />
            <Route path="client" element={<Client />} />
            <Route path="project" element={<Project />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ApolloProvider>
    </>
  );
}
