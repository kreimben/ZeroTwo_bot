FROM node:bullseye as builder1
FROM golang:bullseye as builder2

WORKDIR /app
COPY *.sh /app/
COPY . /app

# Install dependencies
RUN export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig/:$PKG_CONFIG_PATH

ARG DEBIAN_FRONTEND=noninteractive


## install nodejs 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y gcc g++ make nodejs

RUN apt update && apt upgrade -y

RUN chmod +x install_grpcwebproxy.sh && bash ./install_grpcwebproxy.sh

RUN npm install -g typescript yarn -y

# build react app
RUN yarn
RUN yarn build

EXPOSE 3000

CMD ["/app/run_zerotwo.sh"]