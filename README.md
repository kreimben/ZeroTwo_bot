
# ZeroTwo Bot

ZeroTwo Bot은 Discord용 오픈 소스 음악 봇입니다. 

이 봇은 Python으로 작성되었으며, 사용자가 Discord 서버에서 음악을 쉽게 재생할 수 있도록 다양한 기능을 제공합니다. 

<img width="517" alt="image" src="https://github.com/kreimben/ZeroTwo_bot/assets/20333172/b5d4775b-9948-4cb7-a2cc-cccc8c0001ee">

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

## 설치 및 사용 방법

1. **의존성 설치**:
   ```bash
   pip install -r requirements.txt
   ```

2. **봇 실행**:
   ```bash
   python main.py
   ```

3. **Docker 사용**:
   ```bash
   docker build -t zerotwo_bot .
   docker run zerotwo_bot
   ```

## [서버에 추가하기](https://discord.com/api/oauth2/authorize?client_id=960047470589657108&permissions=2150631424&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D960047470589657108%26permissions%3D2150631424%26scope%3Dapplications.commands%2520bot&response_type=code&scope=applications.commands%20bot%20voice%20messages.read)
