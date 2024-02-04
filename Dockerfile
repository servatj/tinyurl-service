FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which the Nest.js application will run
EXPOSE 3020

# Build the Nest.js application
RUN npm run build

COPY .env ./dist

# Start the Nest.js application
CMD ["node", "dist/src/main.js"]
