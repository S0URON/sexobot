FROM node:16.13.2
ARG DISCORD_TOKEN
ARG DISCORD_APP_ID

WORKDIR /usr/src/app
RUN echo $DISCORD_TOKEN
RUN echo $DISCORD_APP_ID

COPY . .
RUN npm install
EXPOSE 3000
# For best practices you may add some HealthCheks to the app
RUN node deploy-commands.js
CMD DISCORD_TOKEN=$DISCORD_TOKEN node index.js
