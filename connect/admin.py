from django.contrib import admin

from .models import CommandHistory


@admin.register(CommandHistory)
class CommandHistoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'guild_id', 'user_id', 'command', 'extra', 'date')
    ordering = ('-date',)
