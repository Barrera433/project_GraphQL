import { IResolvers } from "@graphql-tools/utils";
import PersonModel from '../../models/PersonModel'; 

const peopleResolvers: IResolvers = {
    Query: {
        // 1. OBTENER TODOS: Usa Mongoose para buscar todos los documentos
        async getPeople() {
            try {
                // 'find({})' busca todos los documentos en la colección 'people'
                return await PersonModel.find({}); 
            } catch (error) {
                console.error("Error al obtener personas:", error);
                throw new Error("No se pudo obtener la lista de personas.");
            }
        },

        // 2. OBTENER POR NOMBRE: Busca en la base de datos
        async getPersonByName(parent, { name }) {
            try {
                // Usa una expresión regular para una búsqueda flexible por 'firstName'
                const people = await PersonModel.find({ 
                    firstName: { $regex: new RegExp(`^${name}$`, 'i') } // Búsqueda insensible a mayúsculas
                });
                return people;
            } catch (error) {
                 console.error("Error al buscar por nombre:", error);
                 throw new Error(`Error al buscar persona: ${name}`);
            }
        }
    },
    
    // --- MUTATIONS ---
    Mutation: {
        // 3. CREAR: Inserta el documento usando Mongoose
        async createPerson(parent, { input }) {
            try {
                // El _id es generado por MongoDB
                const newPersonDocument = await PersonModel.create(input);
                const personObject = newPersonDocument.toObject();
                const { _id, ...rest } = personObject as { _id: { toString: () => string }, [key: string]: any };

                // Mapeamos el _id de Mongo al campo 'id' de GraphQL
                return {
                    ...rest, 
            id: _id.toString(),
                };
            } catch (error) {
                // Manejo de errores de MongoDB (ej. email duplicado si es 'unique')
                console.error("Error de inserción en DB:", error);
                throw new Error("No se pudo crear la persona (verifique que el email no esté duplicado).");
            }
        },

        // 4. ACTUALIZAR: Buscar por ID de Mongo y actualizar
        async updatePerson(parent, { id, input }) {
            try {
                // Mongoose utiliza _id para buscar. Usamos findByIdAndUpdate
                const updatedPerson = await PersonModel.findByIdAndUpdate(
                    id, 
                    input, 
                    { new: true } // 'new: true' devuelve el documento actualizado
                );

                if (!updatedPerson) {
                    throw new Error("Person not found");
                }
                
                // Mapeamos y devolvemos el objeto
                return updatedPerson.toObject();

            } catch (error) {
                 // Si el ID no se encuentra o el formato es incorrecto
                throw new Error("Person not found or invalid ID format.");
            }
        },

        // 5. ELIMINAR: Buscar por ID de Mongo y eliminar
        async deletePerson(parent, { id }) {
            try {
                const deletedPerson = await PersonModel.findByIdAndDelete(id);

                if (!deletedPerson) {
                    throw new Error("Person not found");
                }

                // El resolver debe devolver el tipo 'people', por lo que devolvemos el objeto eliminado
                return deletedPerson.toObject(); 

            } catch (error) {
                throw new Error("Person not found or invalid ID format.");
            }
        }
    }
};

export { peopleResolvers };