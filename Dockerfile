#FROM ubuntu:20.04
FROM golang:1.20-bullseye as builder

WORKDIR /app
COPY . /app

# Install dependencies
RUN export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig/:$PKG_CONFIG_PATH

RUN \
    apt update && \
    apt upgrade -y && \
    apt install ffmpeg golang libopusfile-dev ca-certificates openssl git tzdata -y

#RUN go mod download
RUN go build -o main ./src/main.go


EXPOSE 5010
EXPOSE 5011

CMD ["/app/main"]