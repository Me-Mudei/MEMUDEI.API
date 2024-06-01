ARG NODE_VERSION=20.12.2
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /app

# Set production environment
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
ARG YARN_VERSION=1.22.17
RUN npm install -g yarn@$YARN_VERSION --force

# Throw-away build stage to reduce size of final image
FROM base as build

# Install node modules
COPY --link package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# Run prisma deploy to generate client
COPY --link prisma ./prisma
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
RUN yarn run prisma:deploy
RUN yarn run prisma:generate
RUN yarn prisma:seed

# Copy application code
COPY --link . .

# Build application
RUN yarn run build

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "yarn", "run", "start:prod" ]
