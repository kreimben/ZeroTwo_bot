import unittest

from Helper import YoutubeExtractor


class TestYtDlp(unittest.TestCase):
    def test_yt_dlp_chapter(self):
        # Of course, test link should have chapters.
        info = YoutubeExtractor.extract('https://youtu.be/PwYr-zXSqf4')

        assert info.get('chapters') is not None
        print(f'{info.get("chapters")=}')
