# ZeroTwo Bot

ZeroTwo Bot은 Discord용 오픈 소스 음악 봇입니다. 

이 봇은 Python으로 작성되었으며, 사용자가 Discord 서버에서 음악을 쉽게 재생할 수 있도록 다양한 기능을 제공합니다. 

<img width="517" alt="image" src="https://github.com/kreimben/ZeroTwo_bot/assets/20333172/b5d4775b-9948-4cb7-a2cc-cccc8c0001ee">

## 54개 서버에서 실사용되고 있는 서비스 입니다.
<img width="339" alt="image" src="https://github.com/kreimben/ZeroTwo_bot/assets/20333172/17c22e3d-9cc1-4f65-80a9-e4fc765bbb09">

### 이 프로젝트는 여러 기능을 포함하고 있으며, 그 주요 기능과 구조는 다음과 같습니다.

## 주요 기능

1. **음악 재생**: YouTube와 같은 플랫폼에서 음악을 검색하고 재생할 수 있습니다.
2. **재생 목록 관리**: 사용자 정의 재생 목록을 만들고 관리할 수 있습니다.
3. **음악 제어**: 일시 정지, 재개, 스킵, 정지 등의 음악 제어 기능을 제공합니다.
4. **음악 검색**: 노래 제목이나 키워드를 통해 음악을 검색할 수 있습니다.
5. **디스코드 명령어 지원**: 디스코드 채팅 창에서 다양한 명령어를 통해 봇을 제어할 수 있습니다.

## 프로젝트 구조

- **main.py**: 봇의 진입점으로, 디스코드 클라이언트를 초기화하고 봇의 이벤트와 명령어를 설정합니다.
- **bot.py**: 봇의 주요 기능과 명령어가 정의되어 있습니다.
- **buttons.py**: 디스코드 버튼 인터랙션을 처리하는 코드가 포함되어 있습니다.
- **Helper.py**: 유틸리티 함수와 도우미 기능이 포함된 파일입니다.
- **Dockerfile**: Docker 환경 설정 파일로, 봇을 컨테이너화하여 쉽게 배포할 수 있게 합니다.
- **requirements.txt**: 프로젝트에 필요한 파이썬 패키지가 명시된 파일입니다.


## ZeroTwo_bot 이벤트 루프 사용 예시

`ZeroTwo_bot` 프로젝트에서 `Helper.py` 파일의 비동기 함수와 이벤트 루프 사용 예제를 기반으로 설명합니다. 이 봇은 Python의 `discord.py` 라이브러리와 비동기 프로그래밍을 사용하여 음악 재생 기능을 구현합니다.

## 구조도
![image](https://github.com/kreimben/ZeroTwo_bot/assets/20333172/10781f77-4f00-4a9a-b057-0e1a432c6192)
![image](https://github.com/kreimben/ZeroTwo_bot/assets/20333172/96e5400b-a16d-4632-8f1c-6b430508fb11)


## `Helper.py` 코드

```python
class MyAudio(discord.FFmpegOpusAudio):
    ...

class Player:
    def __init__(self, context: discord.ApplicationContext):
        self.play_queue = []
        self._current_playing = None
        self._is_paused = False
        self._event = asyncio.Event()
        self._context = context
        self._task = bot.loop.create_task(self._loop())

    async def _get_source(self, song) -> MyAudio:
        ...

    async def _play(self, after) -> None:
        if self.play_queue:
            next_song = self.play_queue.pop(0)
            source = await self._get_source(next_song)
            self._context.voice_client.play(source, after=after)
            self._current_playing = next_song

    async def _loop(self) -> None:
        while True:
            self._event.clear()
            if not self._context.voice_client.is_playing() and not self._is_paused:
                if self.play_queue:
                    await self._play(self._after_play)
                else:
                    await self._context.voice_client.disconnect()
            await self._event.wait()

    def _after_play(self, error=None):
        if error:
            raise Exception(str(error))
        self._event.set()
```

## 코드 설명

- `Player` 클래스는 비동기 함수와 이벤트 루프를 사용하여 음악 재생을 관리합니다.
- `play` 명령어는 사용자가 음성 채널에 연결되어 있는지 확인하고, 연결되지 않았다면 메시지를 보냅니다.
- `voice_client`를 통해 음성 채널에 연결하고, `Player` 인스턴스를 생성하여 `play` 메서드를 호출합니다.
- `Player` 클래스는 `_get_source` 메서드를 사용해 음악 소스를 가져오고, `_play` 메서드에서 재생합니다.
- `_loop` 메서드는 이벤트 루프를 사용하여 음악 재생이 끝나면 다음 노래를 재생하거나, 큐가 비어있으면 음성 채널에서 연결을 해제합니다.

## [서버에 추가하기](https://discord.com/api/oauth2/authorize?client_id=960047470589657108&permissions=2150631424&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D960047470589657108%26permissions%3D2150631424%26scope%3Dapplications.commands%2520bot&response_type=code&scope=applications.commands%20bot%20voice%20messages.read)
