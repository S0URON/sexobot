FROM node:16.13.2
ARG DISCORD_TOKEN
ARG DISCORD_APP_ID

WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3000
# For best practices you may add some HealthCheks to the app
CMD node deploy-commands.js && node index.js