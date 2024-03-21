# Set the base image
FROM node:18-alpine AS base
WORKDIR /app

# Set the build image
FROM node:18-alpine AS build
WORKDIR /src
COPY . .

# Build the application
RUN npm install

# Set the final image
FROM base AS final
WORKDIR /app
COPY --from=build /src .

# Start the application
ENTRYPOINT ["npm", "start"]