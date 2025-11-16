import mongoose, { Document, Schema } from 'mongoose';

// Interfaz sin id ni _id
export interface IEmployee extends Document {
    Name: string;
    Email: string;
    age: string;
    salary: string;
    position: string;
    adress: string;
    phone: string;
    Skill: mongoose.Types.ObjectId[]; // Referencia al modelo Skill
}

// Definición del Esquema
const EmployeeSchema: Schema = new Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    age: { type: String, required: true },
    salary: { type: String, required: true },
    position: { type: String, required: true },
    adress: { type: String, required: true },
    phone: { type: String, required: true },
    Skill: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }], 
});

// Crear y exportar el Modelo
const EmployeeModel = mongoose.model<IEmployee>('Employee', EmployeeSchema, 'employees'); 

export default EmployeeModel;