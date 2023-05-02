from allauth.socialaccount.adapter import DefaultSocialAccountAdapter


class DiscordSocialAccountAdapter(DefaultSocialAccountAdapter):
    def authentication_error(
            self,
            request,
            provider_id,
            error=None,
            exception=None,
            extra_context=None,
    ):
        extra_data = {'provider_id': provider_id, 'error': error.__str__(), 'exception': exception.__str__(),
                      'extra_context': extra_context}
        print(
            'SocialAccount authentication error!',
            'error',
            f'{extra_data=}'
        )
