import axios from "axios";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const axiosClient = axios.create({
  baseURL: "http://localhost:4000/api/",
  timeout: 1000,
});

export const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/api/graphql/",
  cache: new InMemoryCache(),
});
