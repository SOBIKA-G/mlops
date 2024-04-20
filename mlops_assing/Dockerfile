FROM node:14-alpine as build
# Set the working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json into the container at /app
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code into the container at /app
COPY . .
# Build the React app
RUN npm run build
# Use Nginx to serve the built React app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]