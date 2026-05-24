FROM node:lts

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining files
COPY . .

# Build app
RUN npm run build

# Expose port
EXPOSE 8001

# Start production server
CMD ["npm", "start"]