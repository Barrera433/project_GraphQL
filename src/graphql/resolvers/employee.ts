import { IResolvers } from "@graphql-tools/utils";
import EmployeeModel, { IEmployee } from '../../models/EmployeeModel'; 
import { HydratedDocument } from 'mongoose'; // Usado para tipificar el resultado de Mongoose

// Tipificamos el documento para asegurarnos que TypeScript reconozca _id
type EmployeeDocument = HydratedDocument<IEmployee>;

const employeeResolvers: IResolvers = {
    Query: {
        // En la consulta, el mapeo de _id a id debe ser manejado por el motor GraphQL
        // o por un formato global, pero por simplicidad, lo retornamos.
        async getEmployees() {
            return await EmployeeModel.find({}).populate('Skill'); 
        },

        async getEmployeeByName(parent, { name }) {
            const employees = await EmployeeModel.find({ 
                Name: { $regex: new RegExp(name, 'i') } 
            }).populate('Skill');
            return employees;
        }
    },
    
    Mutation: {
        async createEmployee(parent, { input }) {
            try {
                const newEmployee = await EmployeeModel.create(input) as EmployeeDocument;

                // 1. Usamos .populate para obtener los detalles de Skill
                const populatedEmployee = await newEmployee.populate('Skill') as EmployeeDocument;

                // 2. Convertimos a objeto plano
                const employeeObject = populatedEmployee.toObject();

                // 3. ✅ CORRECCIÓN FINAL: Aplicamos la aserción de tipo para garantizar _id.toString()
                const { _id, ...rest } = employeeObject as { _id: { toString: () => string }, [key: string]: any }; 
                
                // 4. Retornamos el objeto con el mapeo _id -> id
                return {
                    ...rest,
                    id: _id.toString(),
                };
            } catch (error) {
                console.error("Error al crear empleado:", error);
                throw new Error("No se pudo crear el empleado (verifique el email).");
            }
        },

        async updateEmployee(parent, { id, input }) {
            const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
                id, input, { new: true }
            ) as EmployeeDocument | null;

            if (!updatedEmployee) throw new Error("Employee not found");
            
            const populatedEmployee = await updatedEmployee.populate('Skill') as EmployeeDocument;
            const employeeObject = populatedEmployee.toObject();

            // ✅ CORRECCIÓN FINAL
            const { _id, ...rest } = employeeObject as { _id: { toString: () => string }, [key: string]: any };

            return {
                ...rest,
                id: _id.toString(),
            };
        },

        async deleteEmployee(parent, { id }) {
            const deletedEmployee = await EmployeeModel.findByIdAndDelete(id) as EmployeeDocument | null;

            if (!deletedEmployee) throw new Error("Employee not found");
            
            // El documento eliminado no necesita populate si solo devolvemos los campos existentes
            const employeeObject = deletedEmployee.toObject();

            // ✅ CORRECCIÓN FINAL
            const { _id, ...rest } = employeeObject as { _id: { toString: () => string }, [key: string]: any };

            return {
                ...rest,
                id: _id.toString(),
            };
        }
    }
};

export { employeeResolvers };