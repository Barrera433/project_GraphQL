import mongoose, { Document, Schema } from 'mongoose';

// Interfaz para el tipado de TypeScript
export interface IPerson extends Document {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
}

// Definición del Esquema de Mongoose
const PersonSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    // MongoDB añadirá automáticamente el campo _id
});

// Crear y exportar el Modelo. 
// 'people' es el nombre que tendrá la colección en la base de datos.
const PersonModel = mongoose.model<IPerson>('Person', PersonSchema, 'people'); 

export default PersonModel;