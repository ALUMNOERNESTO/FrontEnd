# Imagen base de Node.js (versión LTS)
FROM node:24-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración de dependencias
COPY package*.json ./

# Instalar Angular CLI globalmente y dependencias locales
RUN npm install -g @angular/cli
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto de desarrollo de Angular (por defecto 4200)
EXPOSE 4200

# Comando para ejecutar Angular en modo desarrollo, escuchando en todas las interfaces
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000"]
