from django.urls import path

from connect.views import ConnectView

urlpatterns = [
    path('', ConnectView.as_view(), name='connect'),
]
