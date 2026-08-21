# Stage 1: Build Vite Frontend Static Assets
FROM node:20-alpine AS build

WORKDIR /app

# Ensure devDependencies (vite) are installed
ENV NODE_ENV=development

# Copy package files
COPY package*.json ./
RUN npm install --production=false
RUN npm install -g vite

# Copy source files and build production distribution
COPY . .
RUN vite build

# Stage 2: Serve using Nginx
FROM nginx:alpine

# Copy static assets to Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
