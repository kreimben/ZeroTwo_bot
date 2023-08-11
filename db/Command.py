from peewee import *

from . import mysql_db_connection


class Command(Model):
    """
    Abstract class for all commands.
    No real use case in reality.
    """
    user_id = CharField(unique=True, max_length=50)

    class Meta:
        database = mysql_db_connection


class PlayCommand(Command):
    keyword_or_url = CharField(max_length=200)


class RecommandSongCommand(Command):
    etc = TextField()
