FROM node:22-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias del proyecto (incluye @angular/cli y @angular/build)
RUN npm install
RUN npm install --save-dev @angular/build --legacy-peer-deps 

# Copiar el resto del código fuente
COPY . .

# Exponer puerto de desarrollo
EXPOSE 4200

# Usar el Angular CLI local (dentro de node_modules) para el serve
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--poll=2000"]