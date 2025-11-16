import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Usamos el puerto 27017 mapeado en Docker.
        const mongoURI = "mongodb://localhost:27017/graphql_project";
        
        await mongoose.connect(mongoURI);
        
        console.log('¡MongoDB conectado exitosamente! 🥳');
    } catch (err) {
        console.error('Error de conexión a MongoDB:', err);
        // Salir del proceso si la conexión a la DB falla.
        process.exit(1); 
    }
};

export default connectDB;