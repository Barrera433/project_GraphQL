import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import "graphql-import-node";
import  rootSchema  from "./schemas/source.graphql";
import { resolvers } from "./resolvers/resolversMap";
import  peopleSchema  from "./schemas/people.graphql";
import  skillSchema  from "./schemas/skill.graphql";
import  employeeSchema  from "./schemas/employee.graphql";
import { mergeTypeDefs } from "graphql-tools-merge-typedefs";
import { peopleResolvers } from "./resolvers/people";
import { skillResolvers } from "./resolvers/skill";
import { employeeResolvers } from "./resolvers/employee";

export const schema : GraphQLSchema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([
        rootSchema,
        peopleSchema,
        skillSchema,
        employeeSchema
    ]),
    resolvers: [resolvers, peopleResolvers, skillResolvers, employeeResolvers],
});