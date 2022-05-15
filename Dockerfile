#FROM python:3.10
#FROM node:17
FROM ubuntu:21.04

WORKDIR /app
ADD . .

RUN apt update
RUN apt install python3 python3-pip nodejs npm -y

RUN npm install -g npm@8.6.0
RUN npm i

CMD ["npm", "run", "start"]