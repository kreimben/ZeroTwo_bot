from django.contrib import admin

from .models import CommandHistory


@admin.register(CommandHistory)
class CommandHistoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'discord_guild_id', 'discord_user_id', 'command', 'extra', 'date')
    ordering = ('-date',)
