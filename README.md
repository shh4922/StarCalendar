### 별보러갈래?

카메라로 별사진을 찍기위해서는 날씨, 미세먼지, 구름, 달의모양 을 필수로 확인해야한다.
하지만 달모양과 날씨를 따로 확인해야하는 번거로움이 있다
그냥 한번에 보여주면 너무 편할것같아서 만들기로 하였다.

만약 트래픽이 높아지면 별자리를 같이 보여주는 기능을 추가하거나, 커뮤니티형식으로 발전시킬 예정이다.
숨은명소, 자신이 촬영한 별사진을 공유할수있도록 하고싶다.

---

### 디자인

디자인의 경우 누군가 만들어둔 달력모양을 구글링하여 참고하였고
캘린더 내부에 달의 모양과, 날씨를 표기하려 하였지만, 지역변경에 따라 불필요하게 캘린더를 다시 그려야한다는 점 때문에 날씨는 왼쪽 사이드바에 날씨와 지역을 따로 표기해주도록 할 예정이다
달의 모양은 캘린더에 표시할 예정이다.

하단에는 지역과, 별보러가기 좋은 날짜를 체크하여 보여줄 예정이다.

![스크린샷 2024-07-02 오전 2 23 46](https://github.com/shh4922/StarCalendar/assets/83321146/74b7817a-9240-4258-b61b-b438f840c98e)

---

### 개발

개발은 React 18.2.0 로 진행할 예정이며, NextJS를 사용할까 했지만 아직 SEO 하나만 보고 NextJS 를 선택하는것도 리소스만 잡아먹는것 같아서 React를 사용할것같다.


---
### API
**월령정보 api**

- https://www.data.go.kr/data/15012689/openapi.do#tab_layer_prcuse_exam

**월출정보 api**

- https://www.data.go.kr/data/15012688/openapi.do

**날씨 api**

- https://www.data.go.kr/data/15084084/openapi.do#tab_layer_prcuse_exam

**색상코드**

- #E88D67
- #F3F7EC
- #006989
- #005C78

---

### 문제

**지역별로 날씨가 다른부분은 어디까지 고려할것인가?**

- 기상청 데이터를 확인하니, 동읍면 까지 지역을 나눌시, 지역 데이터가 3800개 이상으로 너무많다고 생각하여, **시군구 까지만 나눌예정이다.**

**기상청 데이터가 현재날짜 모레까지의 날씨정보를 제공하는데, 근 7일간의 날씨는 어떻게 할것인가.**

- 감이 오질않는다. 데이터가없는데 어떻게 날씨정보를 보여주는것인가
- 지금 상황에선 데이터를 찾지못해서 해결하지 못한 상황이다.

**기상청이 날씨데이터 업데이트 주기가 초단기 데이터의경우 30분이고, 단기데이터 의 경우 매일 05시에 업데이트 되는데, 유저가 들어갈때마다 데이터를 받아서 보여주는것은 불필요한 요청을 보내는것이 아닌가**

- NextJS로 개발하면 가능하긴 하겠다만, 이미 상당후 개발이 완료된시점이고 React-query와, 현재시간등을 비교하여 특정시간에 데이터가없을때 업데이트 요청을 보내도록 할 예정이다.


---
### 진행사항

- **20240626**
    - 아이디어 도출
    - 디자인 카피
    - 기획
- **20240627**
    - 개발환경 설정
    - UI 틀 잡기
- **20240628**
    - 달력 버그 수정
    - 지역별 코드 JSON 으로 정리
    - 지역별 HTML select 설정하도록 수정
- **20240629**
    - UI 색 변경
    - 기상청 api 문서확인
    - 기상청데이터 fetch → 현재날짜 기준 모레까지 받기 가능
    - 달력날짜 상태 redux-toolkit 사용하여 관리하도록 수정
- **20240630**
    - react-query 를 통해 서버데이터(날씨) 관리
    - Component 세분화
- **20240631**
    - 날씨데이터 조건식 추가
    - 조건에 따른 UI 리턴
    - 월령데이터 fetch
- **20240701**
    - 월령데이터 별 조건식 추가
    - 월출정보 fetch
    - 달 월출정보, 월령이미지 렌더
