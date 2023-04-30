import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ZeroTwo_bot.settings')

import django

django.setup()

from channels.routing import ProtocolTypeRouter
from django.core.asgi import get_asgi_application

django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    # "websocket": AllowedHostsOriginValidator(
    #     AuthMiddlewareStack(URLRouter([path('ws/chat/', ChatConsumer.as_asgi())]))
    # )
})
