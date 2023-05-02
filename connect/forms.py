from django import forms


class CurrentQueueForm(forms.Form):
    guild_id = forms.CharField(max_length=20, min_length=5)
    user_id = forms.CharField(max_length=20, min_length=5)
