# build phase
FROM node:alpine as builder
WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# run phase (automatically starts the server)
FROM nginx
COPY --from=builder /usr/app/build /usr/share/nginx/html

# run using:
#   docker run -p 8080:80 <image_id>
# Nginx uses port 80 by default
