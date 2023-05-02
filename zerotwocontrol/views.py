import json

from allauth.socialaccount.models import SocialAccount
from django.contrib import messages
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.views.generic import FormView

from discord_bot.Helper import players, get_video_info, Song, Player
from zerotwocontrol.forms import CurrentQueueForm, SearchForm, PlayForm


class CurrentQueueFormView(FormView):
    form_class = CurrentQueueForm
    template_name = 'partial/current_queue.html'
    view_is_async = True

    async def get(self, request: HttpRequest, *args, **kwargs):
        return HttpResponse(content='<h1>Bad Request</h1>', status=400)

    async def post(self, request: HttpRequest, *args, **kwargs):
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
    template_name = 'partial/search_results.html'
    view_is_async = True

    async def get(self, request: HttpRequest, *args, **kwargs):
        return HttpResponse(content='<h1>Bad Request</h1>', status=400)

    async def post(self, request: HttpRequest, *args, **kwargs):
        keyword = self.request.POST.get('keyword', None)
        amount = self.request.POST.get('amount', 10)
        guild_id = self.request.POST.get('guild_id', None)
        user_id = self.request.POST.get('user_id', None)

        if not keyword or not guild_id or not user_id:
            return HttpResponse(content='<h1>Bad Request</h1>', status=400)

        search_result: [Song] = get_video_info(keyword, amount)

        try:
            social_account = await SocialAccount.objects.aget(user=request.user)
        except SocialAccount.DoesNotExist:
            print('User is not logged in. Redirect to signup page.')
            return HttpResponseRedirect(reverse('socialaccount_signup'))

        return self.render_to_response({
            'search_result': search_result,
            'guild_id': guild_id,
            'user_id': user_id,
            'user_name': social_account.extra_data.get('username', 'N/A')
        })


class PlayFormView(FormView):
    form_class = PlayForm
    view_is_async = True

    async def get(self, request: HttpRequest, *args, **kwargs):
        return HttpResponse(content='<h1>Bad Request</h1>', status=400)

    async def post(self, request: HttpRequest, *args, **kwargs):
        guild_id = self.request.POST.get('guild_id', None).split('/')[0]
        user_id = self.request.POST.get('user_id', None).split('/')[0]
        song_url = self.request.POST.get('song_url', None).split('/')[0]
        applicant = self.request.POST.get('applicant', None).split('/')[0]
        # print(f'{guild_id=}, {user_id=}, {song_url=}, {applicant=}')

        # Check parameter first.
        if not guild_id or not user_id or not song_url or not applicant:
            return HttpResponse(content='<h1>Bad Request</h1>', status=400)

        if p := players.get(guild_id, None):
            p: Player
            await p.play(song_url, applicant)
            return HttpResponse(content='<h1>Success to add to queue.</h1>', status=200)
        else:
            print(f'player is not initialized.')
            messages.set_level(request, messages.INFO)
            messages.info(request, 'Please command `/hey` first!')
            return HttpResponse(status=204, headers={
                'HX-Trigger': json.dumps({
                    'messages': [
                        {
                            'message': message.message,
                            'tags': message.tags,
                        } for message in messages.get_messages(request)
                    ]
                })
            })
