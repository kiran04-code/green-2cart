# Use official Node.js LTS base image
FROM node:22.1.0

# Set working directory inside container
WORKDIR /app

# Copy only package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files into the container
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]
