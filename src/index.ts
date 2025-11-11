import connectDB from './config/db';
import { ApolloServer } from "apollo-server-express";
import { schema } from "./graphql";
import cors from "cors";
import express, { Express } from "express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

connectDB();
const app: Express = express();

app.use(cors());
const server = new ApolloServer({
    schema,
   introspection: true,
   plugins: [
       ApolloServerPluginLandingPageGraphQLPlayground(),
   ],
});

server.start().then(res => {
    server.applyMiddleware({ app: app as any });
    app.listen({ port: 4000 }, () => {
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    });
});