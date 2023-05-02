from home.views import BaseMenuView


class ConnectView(BaseMenuView):
    template_name = 'connect.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context
