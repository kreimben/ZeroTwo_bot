from django.urls import path

from zerotwocontrol.views import CurrentQueueFormView, SearchFormView, PlayFormView

urlpatterns = [
    path('current_queue/', CurrentQueueFormView.as_view(), name='current_queue'),
    path('search/', SearchFormView.as_view(), name='search'),
    path('play/', PlayFormView.as_view(), name='play'),
]
