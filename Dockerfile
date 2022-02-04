FROM node:12-alpine
LABEL Drone Service by Ayuba Dauda
COPY . /app
WORKDIR /app
COPY package*.json ./
COPY swagger.json ./
COPY tsoa.json ./
COPY jest.config.js ./
RUN npm install
COPY build ./
CMD ["npm", "start"]
EXPOSE 4000
