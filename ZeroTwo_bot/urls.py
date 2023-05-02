import os

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('home.urls')),
    path('connect/', include('connect.urls')),

    path('accounts/', include('allauth.urls')),
    path(f'{os.getenv("DJANGO_ADMIN")}/', admin.site.urls),
    path('__debug__/', include('debug_toolbar.urls')),
]
