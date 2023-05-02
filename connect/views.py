from allauth.socialaccount.models import SocialAccount
from asgiref.sync import sync_to_async
from django.contrib.auth.models import AnonymousUser
from django.http import HttpResponseRedirect
from django.urls import reverse

from home.views import BaseMenuView


class ConnectView(BaseMenuView):
    template_name = 'connect.html'
    view_is_async = True

    async def get_context_data(self, **kwargs):
        context = await sync_to_async(super().get_context_data)(**kwargs)
        context['guild_id'] = self.request.GET.get('guild_id')
        context['user_id'] = self.request.GET.get('user_id')
        return context

    async def get(self, request, *args, **kwargs):
        context = await self.get_context_data(**kwargs)
        if not context.get('guild_id', None) or not context.get('user_id', None):
            self.template_name = 'connect_error.html'

        # check login and validate user.
        if isinstance(request.user, AnonymousUser):
            print('User is not logged in. Redirect to signup page.')
            return HttpResponseRedirect(reverse('account_login'))

        try:
            social_account = await SocialAccount.objects.aget(user=request.user)
        except SocialAccount.DoesNotExist:
            print('User is not logged in. Redirect to signup page.')
            return HttpResponseRedirect(reverse('socialaccount_signup'))

        context['user_name'] = social_account.extra_data.get('username', 'N/A')

        return self.render_to_response(context)
