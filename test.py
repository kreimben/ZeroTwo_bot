import unittest

import ujson

from Helper import YoutubeExtractor, ChapterExtractor


class TestYtDlp(unittest.TestCase):
    def test_yt_dlp_chapter(self):
        # Of course, test link should have chapters.
        info = YoutubeExtractor.extract('https://youtu.be/aEctTih1RB8')

        assert info.get('chapters', None) is not None
        print(f'result: {ujson.dumps(info.get("chapters"), indent=True)}')


class TestChapterExtractor(unittest.TestCase):
    def test_chapter_extractor_from_str(self):
        ready = [
            {
                "start_time": 0.0,
                "title": "what are chapters",
                "end_time": 48.0
            },
            {
                "start_time": 48.0,
                "title": "how to add chapters",
                "end_time": 140.0
            },
            {
                "start_time": 140.0,
                "title": "reasons your chapters might not be working",
                "end_time": 287
            }
        ]
        chapters = ChapterExtractor.extract_chapter_info(ready)

        assert len(chapters) == 3
        assert chapters[0].title == 'what are chapters'
        assert chapters[1].title == 'how to add chapters'
        assert chapters[2].title == 'reasons your chapters might not be working'

        assert chapters[0].start_time == 0.0
        assert chapters[1].start_time == 48.0
        assert chapters[2].start_time == 140.0

        assert chapters[0].end_time == 48.0
        assert chapters[1].end_time == 140.0
        assert chapters[2].end_time == 287.0

    def test_chapter_extractor_from_str_with_none(self):
        assert ChapterExtractor.extract_chapter_info(None) == []
