# facebook-crawler
puppeteer, xlsx을 이용해 페이스북 페이지를 크롤링하고 엑셀로 저장하는 기능을 구현했습니다. 

## 기술 스택
+ 언어
  + Javascript
+ 모듈
  + puppeteer
  + xlsx
  
## 진행상황
페이지 크롤링과 엑셀에 저장하는 기능까지 구현이 되어 있습니다. sequelize를 이용해 db에 저장하려는 기능을 추가할 계획입니다.  

## 실행
페이스북 페이지 구조가 자주 바뀌어 기능이 동작하지 않을 수 있습니다. 주기적으로 코드 수정 및 점검이 필요합니다.
최상위 폴더에 .env 를 만들어 EMAIL, PASSWORD를 입력한 후 실행해 주세요.

~~~
//.env
EMAIL=  //페이스북 로그인 아이디
PASSWORD = //페이스북 로그인 비밀번호
~~~

![gif1](https://user-images.githubusercontent.com/57119447/143169891-ef21e4f4-b91e-4511-bcf8-ad6554d205d3.gif)
![gif2](https://user-images.githubusercontent.com/57119447/143169907-ecc5768b-ec74-49c6-94c4-a1666bece748.gif)
