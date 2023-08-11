import os

from peewee import MySQLDatabase

mysql_db_connection = MySQLDatabase(
    os.getenv('DATABASE'),
    user=os.getenv('DATABASE_USER'),
    password=os.getenv('DATABASE_PASSWORD'),
    host=os.getenv('DATABASE_HOST'),
    port=os.getenv('DATABASE_PORT'),
    charset='utf8mb4'
)
