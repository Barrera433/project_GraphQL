import mongoose, { Document, Schema, ObjectId } from 'mongoose';

// Interfaz sin id ni _id (Mongoose las añade automáticamente)
export interface ISkill extends Document {
    name: string;
}

// Definición del Esquema
const SkillSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
});

// Crear y exportar el Modelo
const SkillModel = mongoose.model<ISkill>('Skill', SkillSchema, 'skills'); 

export default SkillModel;