FROM node:20-alpine

# Instalar dependencias necesarias para la compilación nativa de better-sqlite3
RUN apk add --no-cache python3 make g++ gcc

# Directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias limpias para producción
RUN npm ci --only=production

# Copiar todo el código de la aplicación
COPY . .

# Exponer el puerto de la API
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
