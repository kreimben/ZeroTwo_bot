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
# add go bin to PATH
ENV PATH=$PATH:/usr/local/go/bin:$GOPATH/bin

RUN cd /app && chmod +x ./run_server.sh #&& chmod +x ./install_grpcwebproxy.sh
RUN bash ./install_grpcwebproxy.sh

EXPOSE 5011
#EXPOSE 5012

CMD ["./run_server.sh"]