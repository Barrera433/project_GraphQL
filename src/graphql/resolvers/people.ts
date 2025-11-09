import { IResolvers } from "@graphql-tools/utils";
import { peopleDataSource } from "../../data/datapeople";
import { get } from "http";
const peopleResolvers: IResolvers = {
    Query: {

       getPeople() {
              return peopleDataSource;
       },
       getPersonByName(parent, { name })  {  
        return peopleDataSource.filter(peopleDataSource => peopleDataSource.firstName.toLowerCase() === name.toLowerCase());     

    }

},
Mutation : {
    createPerson (parent, { input }) {
        const newPerson = {
            id: String(peopleDataSource.length + 1),
            ...input
        };
        peopleDataSource.push(newPerson);
        return newPerson;
    },
    updatePerson (parent, { id, input }) {
        const personIndex = peopleDataSource.findIndex(person => person.id === id);
        if (personIndex === -1) {
            const updatePerson = {
                id,
                ...input
            };
            peopleDataSource[personIndex] = updatePerson;
            return updatePerson;
        }
        throw new Error("Person not found");
    },
    deletePerson (parent, { id }) {
        const personIndex = peopleDataSource.findIndex(person => person.id === id);
        if (personIndex !== -1) {
            peopleDataSource.splice(personIndex, 1);
            return true;
        }
        throw new Error("Person not found");
    }
}
};

export { peopleResolvers };