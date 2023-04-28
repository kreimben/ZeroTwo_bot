FROM node:20-bullseye as builder

WORKDIR /prebuild
COPY . /prebuild

RUN npm install -g serve typescript

# build react app
RUN npm install
RUN npm run build

WORKDIR /app
RUN mv /prebuild/build/* /app/
RUN rm -rf /prebuild

EXPOSE 3000

CMD ["pwd", "&&", "npx", "serve@latest", "-l", "3000"]