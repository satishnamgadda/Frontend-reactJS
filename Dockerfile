FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build the production version
RUN npm run build

# Install serve to run production build
RUN npm install -g serve

# OpenShift runs as random UID, give group permissions
RUN chgrp -R 0 /app && \
    chmod -R g=u /app

# Expose port
EXPOSE 3000

# Run production build on port 3000
CMD ["serve", "-s", "build", "-l", "3000"]
