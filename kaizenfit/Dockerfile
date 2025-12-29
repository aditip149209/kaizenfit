# STAGE 1: Build the React app
# Use a Node.js image and call this stage 'builder'
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Run the build script to create the static files
RUN npm run build

# ---

# STAGE 2: Serve the app with Nginx
# Use a lightweight Nginx image
FROM nginx:alpine

# Copy the static files from the 'builder' stage (Stage 1)
# to the directory Nginx serves from
COPY --from=builder /app/build /usr/share/nginx/html

# Tell Docker that the container listens on port 80
EXPOSE 80

# The command to start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]