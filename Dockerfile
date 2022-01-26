FROM node:12-alpine
LABEL Drone Service by Ayuba Dauda
COPY . /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src ./
CMD ["npm", "start"]
EXPOSE 4000
