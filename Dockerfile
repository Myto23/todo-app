# Establecer la imagen base
FROM node:18.19.1 AS build

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de la aplicación y las dependencias
COPY package.json package-lock.json ./
COPY . .

# Instalar las dependencias
RUN npm install

# Compilar la aplicación
RUN npm run build --prod

# Establecer la imagen base para servir la aplicación
FROM nginx:1.19.8-alpine

# Copiar los archivos de compilación de la aplicación a la imagen de Nginx
COPY --from=build /usr/src/app/dist/todo-app /usr/share/nginx/html

# Exponer el puerto 80 para Nginx
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
