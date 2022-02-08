FROM node:17-alpine

# Create app directory
WORKDIR /usr/src/app

ENV DB_TOKEN="postgres://gosdurtygktirn:ec3fe04043d41a2fc90ed6f6ee98c8b4f7399f1a685af5724bb418e8772b3a6a@ec2-54-229-68-88.eu-west-1.compute.amazonaws.com:5432/d8v06dbndnu9f0"

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

CMD [ "node", "index.js" ]
