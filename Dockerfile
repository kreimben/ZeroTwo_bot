FROM node:18-bullseye

WORKDIR /app
ADD . .

RUN apt update

RUN apt install python3 python -y


RUN yarn install
RUN yarn run clean
RUN yarn run build

CMD ["yarn", "run", "dev"]