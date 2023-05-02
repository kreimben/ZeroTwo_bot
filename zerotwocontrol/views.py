from django.http import HttpRequest, HttpResponse
from django.views.generic import FormView

from discord_bot.Helper import players
from zerotwocontrol.forms import CurrentQueueForm


class CurrentQueueFormView(FormView):
    form_class = CurrentQueueForm
    template_name = 'partial/current_queue.html'

    def get(self, request: HttpRequest, *args, **kwargs):
        return HttpResponse(content='<h1>Bad Request</h1>', status=400)

    def post(self, request: HttpRequest, *args, **kwargs):
        guild_id = self.request.POST.get('guild_id', None)
        user_id = self.request.POST.get('user_id', None)

        if not guild_id or not user_id:
            return HttpResponse(content='<h1>Bad Request</h1>', status=400)

        if p := players.get(guild_id, None):
            current_song, queue = p.get_queue()
        else:
            current_song, queue = None, None

        return self.render_to_response({
            'current_song': current_song,
            'queue': queue
        })
