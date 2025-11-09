import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import "graphql-import-node";
import  rootSchema  from "./schemas/source.graphql";
import { resolvers } from "./resolvers/resolversMap";
import  peopleSchema  from "./schemas/people.graphql";
import { mergeTypeDefs } from "graphql-tools-merge-typedefs";
import { peopleResolvers } from "./resolvers/people";

export const schema : GraphQLSchema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([
        rootSchema,
        peopleSchema
    ]),
    resolvers: [resolvers, peopleResolvers],
});