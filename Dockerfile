# Use node 8.7
FROM node:latest

# Copy source code
COPY . /app

# Change working directory
WORKDIR /app

# Install dependencies
RUN npm install

# Expose API port 80
EXPOSE 80

# Launch application
CMD ["npm","start-prod"]
