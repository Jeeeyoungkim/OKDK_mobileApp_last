<p align="center">
<img src="https://github.com/Devlants/OKDK_mobileApp_last/assets/102647933/61eaa63c-3741-4049-9406-27d541b5a163" style="width:100px; height:100px; border-radius:20%"/>
    <br />
    <h1 align="center">OKDK KIOSK</h1>
    <p align="center">2023학년도 상명대학교 캡스톤 디자인</p>
    <p align="center">
        <a href="https://play.google.com/store/apps/details?id=com.okeydokeymobile">Final Presentation</a>
        ·
        <a href="https://file.notion.so/f/f/81fed896-bbb8-43da-849f-bf80d81f4fcf/9dcd388c-9fac-4485-bfe4-517ddbb99987/OKDK%E1%84%8F%E1%85%B5%E1%84%8B%E1%85%A9%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3-%E1%84%87%E1%85%A1%E1%86%AF%E1%84%91%E1%85%AD.pdf?id=130a809e-95d6-42c2-af6a-249ab0419380&table=block&spaceId=81fed896-bbb8-43da-849f-bf80d81f4fcf&expirationTimestamp=1711087200000&signature=rSH8WaTFcAYA3_Ww0iO0d-GMdBVSPCRfn8DMXtSCmKs&downloadName=OKDK%E1%84%8F%E1%85%B5%E1%84%8B%E1%85%A9%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3-%E1%84%87%E1%85%A1%E1%86%AF%E1%84%91%E1%85%AD.pdf">Google Play Store</a>
    </p align="center">
</p>

<br />

<p align="center">
<img src="https://github.com/Devlants/OKDK_mobileApp_last/assets/102647933/1cc33b56-acad-49aa-81c3-259b18f1f2f3" style="width:500px;"/>
<img src="https://github.com/Devlants/OKDK_mobileApp_last/assets/102647933/8a776fd0-717f-4dad-9672-b81dffe41e42" style="width:500px;"/>
</p>

<br />

## 💁 프로젝트 소개

OKDK 프로젝트는 <b>정보 격차를 해소하기 위한 안면인식 키오스크</b>로, 매장에서 사용할 수 있는 키오스크 APP과 사용자가 키오스크와 연동하여 사용할 수 있는 MOBILE APP, 총 두 가지 서비스로 이루어져 있습니다. 

<br/>

>  디지털 취약 계층인 노년층에게도 OKDK 키오스크는 쉽게 다가갈 수 있습니다.

'쉬운 모드'를 두어 메뉴를 트리화하였고 사용자 친화적인 UI를 통해 메뉴 선택의 어려움을 덜었습니다. 안면인식 기술을 통해 주문-결제-적립 과정이 한 번에 쉽고 빠르게 이루어질 수 있도록 하였습니다.

<br/>

>다양한 매장에서 오키도키 서비스를 이용할 수 있습니다. 

APP과 매장들이 api로 연결되어 각각의 모듈에 대한 코드 변경이 시스템 전체에 영향을 끼치지 않아 유지/보수가 쉽고 확장이 용이합니다.
 
<br/>

## 🥤 프로젝트 기능
- <b>KIOSK</b>
1. 아두이노 센서 : 아두이노 센서가 적외선을 탐지하여 사용자가 가까이 다가갈 경우 대기 화면에서 얼굴 인식 화면으로 변화합니다.
2. 얼굴 인식 : 디바이스 전면 카메라에 얼굴을 비추면 사용자의 얼굴을 인식하여 가장 유사도가 높은 회원의 닉네임을 리턴합니다.
3. 키오스크 기본 기능 : 메뉴와 옵션, 수량을 선택하여 장바구니에 넣고 적립할 수 있는 기능이 있습니다.
4. 영수증 프린터 : 사용자가 주문을 마치면 디바이스와 연결된 영수증 프린터기에 주문 번호를 담은 영수증이 출력됩니다.

- <b>MOBILE APP</b>

1. 소셜 로그인 : oAuth2.0 프로토콜을 활용한 카카오 로그인, 네이버 로그인, 구글 로그인 3가지 종류의 소셜 로그인을 지원합니다. 
2. 얼굴 등록 : 디바이스의 전면 카메라를 이용해 회원가입시 사용자의 얼굴을 등록합니다. 
2. 모드 선택 : 키오스크에서 사용할 모드를 선택할 수 있습니다. (일반 모드 / 쉬운 모드)
3. 즐겨찾는 메뉴 등록 : 즐겨찾는 매장을 선택하고, 메뉴와 옵션 등을 선택하여 즐겨찾는 메뉴에 추가할 수 있습니다. 키오스크와 연동됩니다.
4. 카드 등록 : 결제에 사용할 카드 정보를 사진을 찍어서 혹은 수기로 입력할 수 있습니다.
5. 결제 내역 확인 : 키오스크에서 결제한 내역을 확인할 수 있고, 최근 3월 사용량과 평균을 시각화 하여 제공합니다.
6. 설정 : 이전에 등록한 얼굴 데이터를 수정하거나 로그아웃, 탈퇴를 할 수 있습니다.

## 🛠 기술 스택
### Front-End
- JavaScript ES6, React, React Native
- styled-components
- navigation, chartjs-2, icons, async-storage, react-native-camera
- Aws EC2


## 🎥 시연 영상
[![Video Label](http://img.youtube.com/vi/'유튜브주소의id'/0.jpg)](https://youtu.be/1c2iJvYrY_w?si=_W6jt3spMMD8V5ms)


## 👨‍👩‍👧‍👦 팀원들
| 팀장 / 백엔드 | 백엔드 | 프론트엔드 | 프론트엔드 | 프론트엔드 | 디자인 |
| --- | --- | --- | --- | --- | --- |
|  <a href="https://github.com/jomulagy"><img src="https://avatars.githubusercontent.com/jomulagy?s=100" width="100px;" alt=""/>         <br /><sub><b>jomulagy</a>| <a href="https://github.com/walloonam"><img src="https://avatars.githubusercontent.com/walloonam?s=100" width="100px;" alt=""/>         <br /><sub><b>walloonam</a>| <a href="https://github.com/kimyeonchul"><img src="https://avatars.githubusercontent.com/kimyeonchul?s=100" width="100px;" alt=""/>         <br /><sub><b>kimyeonchul</a>| <a href="https://github.com/master1st"><img src="https://avatars.githubusercontent.com/master1st?s=100" width="100px;" alt=""/>         <br /><sub><b>master1st</a>| <a href="https://github.com/jeeeyoungkim"><img src="https://avatars.githubusercontent.com/jeeeyoungkim?s=100" width="100px;" alt=""/>         <br /><sub><b>jeeeyoungkim</a>| <a href="https://github.com/2oooo914"><img src="https://avatars.githubusercontent.com/2oooo914?s=100" width="100px;" alt=""/>         <br /><sub><b>2oooo914</a>|
|김지훈|임재훈|김연출|윤석현|김지영|조유진



