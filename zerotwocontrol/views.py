from django.http import HttpRequest, HttpResponse
from django.views.generic import FormView

from discord_bot.Helper import players, get_video_info, Song
from zerotwocontrol.forms import CurrentQueueForm, SearchForm


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


class SearchFormView(FormView):
    form_class = SearchForm
    template_name = 'partial/search.html'

    def get(self, request: HttpRequest, *args, **kwargs):
        return HttpResponse(content='<h1>Bad Request</h1>', status=400)

    def post(self, request: HttpRequest, *args, **kwargs):
        keyword = self.request.POST.get('keyword', None)
        amount = self.request.POST.get('amount', 10)

        if not keyword:
            return HttpResponse(content='<h1>Bad Request</h1>', status=400)

        search_result: [Song] = get_video_info(keyword, amount)

        return self.render_to_response({
            'search_result': search_result
        })


# class PlayFormView()