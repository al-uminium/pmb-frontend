# Stage 1: Build the Angular application
FROM node:18 AS build

WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the Angular CLI and app dependencies
RUN npm install -g @angular/cli
RUN npm install

# Copy the Angular application source code to the container
COPY . .

# Build the Angular application
RUN ng build --prod

# Stage 2: Serve the Angular application with NGINX
FROM nginx:alpine

# Copy the built Angular app from the build stage to the nginx server
COPY --from=build /app/dist/ppm-frontend /usr/share/nginx/html

# Expose the port that the application will run on
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
