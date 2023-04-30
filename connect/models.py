from django.db import models


class CommandHistory(models.Model):
    guild_id = models.CharField(max_length=20)
    user_id = models.CharField(max_length=20)
    command = models.CharField(choices=(
        ('play', 'play'),
        ('pause', 'pause'),
        ('resume', 'resume'),
        ('stop', 'stop'),
        ('skip', 'skip'),
        ('shuffle', 'shuffle'),
        ('search', 'search'),
    ), max_length=10)
    extra = models.CharField(max_length=100, blank=True)  # keywords for search or song name for play etc...
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Command Histories'
