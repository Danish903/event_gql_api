import { GraphQLServer } from 'graphql-yoga'
import mongoose from "mongoose";
require("dotenv").config({ path: "variables.env" });
import graphqlConfig from "./api";

mongoose.Promise = global.Promise;
// console.log("mongo", process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => {
  // console.log("MongoDB connected");
}).catch(error => {
  console.log("Mongodb Error", error);
})
const server = new GraphQLServer({ context: graphqlConfig.context, typeDefs: graphqlConfig.typeDefs, resolvers: graphqlConfig.resolvers })
server.start(() => console.log('Server is running on localhost:4000'))