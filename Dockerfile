# Use Node.js image to build the application
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app for production
RUN npm run build

# Use Nginx to serve the built app
FROM nginx:alpine

# Copy the build directory to Nginx's HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the app to be accessible
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

