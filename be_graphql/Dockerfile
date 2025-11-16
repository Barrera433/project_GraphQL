# 1. Base de la Imagen
FROM node:20-alpine

# 2. Directorio de trabajo
WORKDIR /app

# 3. Copiar package.json desde la carpeta superior (project_GraphQL/)
# y colocarlo en el WORKDIR actual (/app)
COPY ../package*.json ./

# 4. Instalar todas las dependencias
RUN npm install

# 5. Copiar el código fuente (la carpeta be_graphql/)
COPY . .

# 6. Exponer el puerto
EXPOSE 4000

# 7. Comando de inicio (Ejecuta el script 'dev')
CMD ["npm", "run", "dev"]