import { IResolvers } from "@graphql-tools/utils";
import { dataSource } from "../../data/dataSource";

const resolvers: IResolvers = {
    Query: {
        hello(_,{name}) {
              return `Hello ${name || "world"}!` ;
       },
       getUser(_: any, args: { id: number }) {
              return dataSource.getUser(args.id);
         }
    }
};

export { resolvers };