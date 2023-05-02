from django import forms


class GuildAndUserForm(forms.Form):
    """
    This is basic form for required guild_id and user_id.
    """
    guild_id = forms.CharField(max_length=20, min_length=5)
    user_id = forms.CharField(max_length=20, min_length=5)


class CurrentQueueForm(GuildAndUserForm):
    pass
