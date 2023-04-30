from connect.views import ConnectView
from django.urls import path

urlpatterns = [
    path('/', ConnectView.as_view(), name='connect'),
]