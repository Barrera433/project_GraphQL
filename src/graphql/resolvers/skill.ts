import { IResolvers } from "@graphql-tools/utils";
import SkillModel, { ISkill } from '../../models/SkillModel'; 
import { HydratedDocument } from 'mongoose'; // Usado para tipificar el resultado de Mongoose

// Tipificamos el documento para asegurarnos que TypeScript reconozca _id
type SkillDocument = HydratedDocument<ISkill>;

const skillResolvers: IResolvers = {
    Query: {
        async getSkills() {
            return await SkillModel.find({}); 
        },
    },
    
    Mutation: {
        async createSkill(parent, { input }) {
            try {
                const newSkill = await SkillModel.create(input) as SkillDocument;
                const skillObject = newSkill.toObject();

                // ✅ CORRECCIÓN FINAL: Aplicamos la aserción de tipo para garantizar _id.toString()
                const { _id, ...rest } = skillObject as { _id: { toString: () => string }, [key: string]: any }; 

                return {
                    ...rest,
                    id: _id.toString(),
                };
            } catch (error) {
                throw new Error("Error al crear habilidad (posible duplicado).");
            }
        },

        async updateSkill(parent, { id, input }) {
            const updatedSkill = await SkillModel.findByIdAndUpdate(
                id, input, { new: true }
            ) as SkillDocument | null;
            
            if (!updatedSkill) throw new Error("Skill not found");
            const skillObject = updatedSkill.toObject();

            // ✅ CORRECCIÓN FINAL
            const { _id, ...rest } = skillObject as { _id: { toString: () => string }, [key: string]: any };

            return {
                ...rest,
                id: _id.toString(),
            };
        },
        
        async deleteSkill(parent, { id }) {
            const deletedSkill = await SkillModel.findByIdAndDelete(id) as SkillDocument | null;
            
            if (!deletedSkill) throw new Error("Skill not found");
            const skillObject = deletedSkill.toObject();

            // ✅ CORRECCIÓN FINAL
            const { _id, ...rest } = skillObject as { _id: { toString: () => string }, [key: string]: any };

            return {
                ...rest,
                id: _id.toString(),
            };
        }
    }
};

export { skillResolvers };