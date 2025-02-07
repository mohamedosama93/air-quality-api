# Use Node.js LTS as base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose API port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]