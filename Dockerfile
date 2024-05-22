# Use an official Node runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Install TypeScript globally
RUN npm install -g typescript

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project
# Note: It might be more efficient to only copy necessary files
COPY . .

# Build the project using TypeScript Compiler
RUN tsc -b

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Set environment variable
ENV NODE_ENV production

# Run the app when the container launches
CMD ["node", "dist/index.js"]
