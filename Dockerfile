# Use an official Node runtime as a parent image (Debian-based)
FROM node:16-buster

# Set the working directory in the container
WORKDIR /usr/src/app

# Install TypeScript globally
RUN npm install -g typescript

# Install OpenSSL (libssl1.1 is included by default in Debian 10)
RUN apt-get update -y && apt-get install -y openssl

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project, excluding files in .dockerignore
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the project using TypeScript Compiler
RUN tsc -b

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Set environment variable
ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://nutricraft_owner:crQIk9tJZ6hs@ep-dry-brook-a5q05lmz-pooler.us-east-2.aws.neon.tech/nutricraft?sslmode=require
ENV JWT_PASSWORD=b7r%l0hh.
# Run the app when the container launches
CMD ["node", "dist/index.js"]
