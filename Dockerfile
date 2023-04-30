FROM golang:bullseye as builder

WORKDIR /app
COPY src /app/src
COPY go.mod /app/
COPY go.sum /app/

# Install dependencies
RUN export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig/:$PKG_CONFIG_PATH

ARG DEBIAN_FRONTEND=noninteractive

# To install yt-dlp
RUN echo "deb http://deb.debian.org/debian bullseye-backports main" > /etc/apt/sources.list.d/bullseye_backports.list && apt update

RUN apt update && apt upgrade -y
RUN apt install build-essential ffmpeg libopusfile-dev ca-certificates openssl git tzdata -y
RUN apt install -t bullseye-backports yt-dlp -y

RUN cd /app && go mod download
RUN go build -o /app/main /app/src/main.go

EXPOSE 3000

CMD ["/app/main"]