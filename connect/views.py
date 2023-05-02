from home.views import BaseMenuView


class ConnectView(BaseMenuView):
    template_name = 'connect.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['guild_id'] = self.request.GET.get('guild_id')
        context['user_id'] = self.request.GET.get('user_id')
        return context

    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        if not context.get('guild_id', None) or not context.get('user_id', None):
            self.template_name = 'connect_error.html'
        return self.render_to_response(context)
