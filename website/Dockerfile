# Use an official Node.js runtime as the base image
FROM node:16

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Create and set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy the rest of your application files to the container
COPY . .

# Build your React app (modify this according to your app setup)
RUN npm run build

# Expose the port that your React app will run on

# COPY ./dist /app/dist
EXPOSE $PORT

# Start your React app
CMD ["npm", "run", "preview"]