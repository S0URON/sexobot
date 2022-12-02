FROM node:16.13.2
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3000
# For best practices you may add some HealthCheks to the app
CMD node index.js