from django.urls import path

from zerotwocontrol.views import CurrentQueueFormView

urlpatterns = [
    path('current_queue/', CurrentQueueFormView.as_view(), name='current_queue'),
]
