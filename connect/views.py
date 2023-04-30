from django.views.generic.base import TemplateView


class ConnectView(TemplateView):
    template_name = 'connect.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Home'
        return context
