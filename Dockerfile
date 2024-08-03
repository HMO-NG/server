# Stage 1: Build the app
FROM node:lts-alpine3.20 AS appbuild
# Set working directory
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

# Copy source files and build the app
COPY ./src ./src

RUN yarn run build

# Stage 2: Set up the production environment
# This is neccessary to reduce image size and caching
FROM node:lts-alpine3.20 AS prod
RUN apk update && apk add curl

WORKDIR /app

COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production

COPY --from=appbuild /app/dist ./dist

EXPOSE 3000

CMD ["yarn", "start"]
