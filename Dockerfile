FROM python:3.10.6-bullseye

WORKDIR /app
ADD . .

RUN apt update && apt install ffmpeg -y
RUN pip install -r requirements.txt

CMD ["python", "main.py"]