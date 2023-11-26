# Use Node.js 14 with Alpine Linux as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install pnpm globally
RUN npm install -g pnpm

# Install project dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your application will run on
EXPOSE 80

# Start the application
CMD ["pnpm", "start"]
