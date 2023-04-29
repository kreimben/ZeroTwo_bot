FROM node:20-bullseye

WORKDIR /app
COPY . /app

RUN npm install -g typescript

# build react app
RUN npm install
RUN npm run build

EXPOSE 3000