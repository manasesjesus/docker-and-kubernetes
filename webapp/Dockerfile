# Specify a base image
FROM node:alpine

# Specify working directory
WORKDIR /usr/app

# Install dependencies and copy resources
COPY ./package.json ./
RUN npm install
COPY ./ ./

# Default command
CMD ["npm", "start"]



# Terminal commands

# Build and tag the image 
# docker build -t mj/webapp .

# Run the container with port forwarding
# docker run -p 5000:8080 mj/webapp
