FROM python:bullseye

WORKDIR /app
ADD . .

RUN apt update && apt install ffmpeg -y
RUN pip install -r requirements.txt
RUN python3 -m pip install -U pip setuptools wheel
RUN python3 -m pip install --force-reinstall https://github.com/yt-dlp/yt-dlp/archive/master.tar.gz

CMD ["python", "main.py"]