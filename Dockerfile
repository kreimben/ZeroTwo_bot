FROM node:18-bullseye

WORKDIR /app
ADD . .

RUN apt update

RUN apt install python3 python -y


RUN npm install --force
RUN npm run build

CMD ["npm", "run", "start"]