FROM ubuntu:22.04 as builder

WORKDIR /app
COPY . /app

# Install dependencies
RUN export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig/:$PKG_CONFIG_PATH

ARG DEBIAN_FRONTEND=noninteractive

RUN \
    apt update && \
    apt upgrade -y && \
    apt install ffmpeg golang libopusfile-dev ca-certificates openssl git tzdata yt-dlp -y

# set GOPATH as ubuntu's default.
ENV GOPATH=/root/go

RUN cd /app && chmod +x ./install_grpcwebproxy.sh && chmod +x ./run_server.sh
RUN bash ./install_grpcwebproxy.sh

EXPOSE 5012

CMD ["./run_server.sh"]