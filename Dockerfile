FROM golang:bullseye as builder

WORKDIR /app
COPY src /app/src
COPY go.mod /app/
COPY go.sum /app/
COPY *.sh /app/

# Install dependencies
RUN export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig/:$PKG_CONFIG_PATH

ARG DEBIAN_FRONTEND=noninteractive

# To install yt-dlp
RUN echo "deb http://deb.debian.org/debian bullseye-backports main" > /etc/apt/sources.list.d/bullseye_backports.list && apt update

# install nodejs 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y gcc g++ make nodejs

#RUN apt install software-properties-common -y && apt update
RUN apt update && apt upgrade -y
RUN apt install build-essential ffmpeg libopusfile-dev ca-certificates openssl git tzdata -y
RUN apt install -t bullseye-backports yt-dlp -y

RUN cd /app && go mod download
RUN go build -o /app/main /app/src/main.go

RUN chmod +x run_server.sh && chmod +x install_grpcwebproxy.sh && chmod +x run_zerotwo.sh && bash ./install_grpcwebproxy.sh

RUN npm install -g typescript yarn -y

RUN rm -rf /app/src
COPY pages /app

# build react app
RUN yarn
RUN yarn build

EXPOSE 3000

CMD ["/app/run_zerotwo.sh"]