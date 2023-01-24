FROM python:bullseye

WORKDIR /app
ADD . .

RUN apt update && apt install ffmpeg -y
RUN pip install -r requirements.txt

CMD ["python", "main.py"]