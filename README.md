## 개발일지

### 2021.03.08

cors 때문에 애를 먹는 중입니다. django로 서버를 구성하였기에 django-cors-headers를 이용하여 해결한 듯 했습니다. 

하지만 문제가 해결이 된 것이 아닌게 다른 사람의 전적은 검색이 가능한데 제 전적을 검색하려고 할때마다 cors에러가 나서 이게 도대체 무슨 문제인지 파악하고 있습니다. 

### 2021.03.09

검색한 유저의 티어와 최근 한 경기를  api로 만들고, 웹에서 보이도록 구현하였습니다.

### 2021.03.11

![image-20210311232109621](https://user-images.githubusercontent.com/60080270/110802656-bb715d80-82c1-11eb-8faa-f8560cf58155.png)

서버에서 스펠과 챔피언 api를 만들어서 다음과 같이 유저의 가장 최근 첫 경기에 대한 정보를 가져올 수 있도록 구현 하였습니다.

### 2021-03-12

- 처음 유저를 검색했을때 20개의 match를 불러올 수 있게 수정하였습니다.

- 처음 검색한 match를 기반으로 최근 20경기에 대한 요약을 시각화하여 구현하였습니다

   ![image](https://user-images.githubusercontent.com/60080270/110928941-c3390c80-836a-11eb-9d08-2bf36a8c83f8.png)

### 2021-03-15

- 서버 api성능 향상을 위해서 `redis`를 이용하여 `cache`를 적용하였습니다.
- 통상적인 `pip install`방법으로는 `redis`가 다운받아지지 않으므로 `window`를 위한 다운로드 방법을 따로 찾아서 다운 받았습니다.
- `cache`내의 데이터를 최대한 이용하되, 전적 검색 사이트이다 보니 데이터를 주기적으로 업데이트 할 필요를 느꼈습니다.
- 그래서 전적 갱신 버튼을 새로이 만들어서 유저들의 데이터가 갱신 되고자 할때 갱신 할 수 있게 구현하엿습니다.

### 2021-03-16

- api를 불러 오는동안 시간이 꽤 걸리는 상황에서 유저들에게 로딩이 되고 있다는 것을 알리기 위해 트랜잭션을 추가하였습니다.

### 2021-03-17

- 자유랭크와 솔로랭크를 구분해서 받을 수 있게 api 설계 변경
- 아이템도 보여질수 있게 구현

### 2021-03-18

- 가시성을 위해 간단한 css 정리

### 2021-03-25

- 캐시 유효 시간을 1시간으로 연장

  한 게임이 1시간이 안되는 것을 고려하여 1시간으로 지정

- api를 불러올때 마다 캐시를 갱신하도록 변경

  api가 아닌 캐시로 정보를 불러올경우 캐시가 갱신 되지 않아 캐시가 제 역할을 하지 못한 것을 개선

- 사용자 정보 css 로 가시성을 높힘

### 2021-03-30

- 상태관리를 유용하게 하기 위해 도전 중 (쉽지 않음.)
- 일단 다른 사람들이 한 방법을 이해하려고 노력하는 중.

### 2021-04-14

- webpack 적용하였음
- 최근 20 매치 결과도 승패를 눈으로 알수 있게 `background-color`를 설정 하였습니다.

### 2021-04-15

- `Netlify`를 이용하여 프론트엔드를 배포하였습니다.
- master 브랜치로 푸쉬할경우 자동으로 배포됩니다.
- 서버 쪽에 `api`를 요청할때 url 마지막에 "/"를 추가하지 않아서 제대로 api요청이 되지 않는 오류를 해결하였습니다.
- [https://mancityballboy.netlify.app](https://mancityballboy.netlify.app/) 사이트 주소입니다.

### 2021-04-16

- 존재하지 않는 소환사 명으로 검색할 경우 예외 처리를 구현하였습니다.

### 2021-04-18

- session storage에 정보를 저장함으로써 새로고침을 하더라도 똑같은 유저를 검색할 수 있도록 하였습니다.

### 2021-04-19

- aws lightsail을 이용해서 서버 배포를 시도하고 있습니다... 잘안되네융...

### bug

- ~~자유 랭크와 솔로 랭크 둘중 하나라도 활성화 되어있지 않을시 오류~~
- 오른의 걸작 아이템이 제대로 나오지 않는 이슈(이건 라이엇에서 제공하는 이미지 주소가 이상함.)
- cors 문제를 해결하기 위해 webpack-dev-server에서 proxy 설정하려했지만 잘되지 않아서 django서버에서 프론트엔드 서버주소를 cors-allow-origin에 추가하는 방식으로 해결하였습니다. proxy문제해결에 대한 고민이 필요합니다.

### Todo

- 인피니티 스크롤
- ~~프론트엔드 배포하기~~
- 백엔드 배포하기