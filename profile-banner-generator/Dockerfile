FROM node:15

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY . .
RUN npm ci

EXPOSE 8080

CMD [ "node", "profile-proxy.js" ]
