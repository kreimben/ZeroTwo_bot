FROM node:18-bullseye

WORKDIR /app
ADD . .

RUN apt update

RUN apt install python3 python -y

RUN python --version

RUN npm install --force

CMD ["npm", "run", "start"]