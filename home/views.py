from allauth.socialaccount.models import SocialAccount
from django.contrib.auth.models import AnonymousUser
from django.views.generic.base import TemplateView


class BaseMenuView(TemplateView):
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        if isinstance(self.request.user, AnonymousUser):
            context['user'] = None
            return context
        else:
            try:
                context['user'] = SocialAccount.objects.get(user=self.request.user)
            except SocialAccount.DoesNotExist:
                # not registered.
                context['user'] = None

        return context


class HomeView(BaseMenuView):
    template_name = 'home.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context
