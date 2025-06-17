# Stage 1: Build the Node.js application
FROM node:18-slim AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Build the application (adjust the build command if necessary)
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:latest AS production

# Set the working directory
WORKDIR /usr/share/nginx/html

# Remove the default Nginx HTML files
RUN rm -rf ./*

# Copy built files from the previous stage
COPY --from=build /usr/src/app/dist .

# Copy custom Nginx configuration (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]