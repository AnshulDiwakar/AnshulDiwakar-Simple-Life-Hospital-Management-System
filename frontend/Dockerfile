# Use official Node.js image to build the React app
FROM node:18-alpine as build

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

RUN npm run build

# Use nginx to serve the static build files
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the host
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
