# Use the official Node.js image as the base image
FROM node:18 AS build

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Angular application
RUN npm run build --prod

# Use the official Nginx image to serve the built Angular app
FROM nginx:alpine

# Copy the built Angular app from the previous stage
COPY --from=build /usr/src/app/dist/your-angular-app /usr/share/nginx/html

# Expose port 80 to access the app
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
