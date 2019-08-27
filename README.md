# 개고수 서버

## Description

- node.js, express, graphql-yoga with mysql

## 1. npm install

- 설치 되는 모듈
  1. "apollo-server-core"
  1. "aws-sdk"
  1. "cookie-parser"
  1. "cors"
  1. "crypto"
  1. "dotenv"
  1. "graphql-tools"
  1. "graphql-yoga"
  1. "jsonwebtoken"
  1. "merge-graphql-schemas"
  1. "morgan"
  1. "multer"
  1. "multer-s3"
  1. "multer-sharp-s3"
  1. "mysql2"
  1. "node-fetch"
  1. "nodemailer"
  1. "nodemailer-sendgrid-transport"
  1. "nodemon"
  1. "passport"
  1. "passport-google-oauth20"
  1. "passport-kakao"
  1. "path"
  1. "sequelize"
  1. "socket.io"
  1. "babel-cli"
  1. "babel-preset-env"
  1. "babel-preset-stage-3"
  1. "eslint"
  1. "eslint-config-airbnb-base"
  1. "eslint-config-prettier"
  1. "eslint-plugin-import"

## 2. .env 파일 생성

- .env 파일을 root 디렉토리에 생성해야 합니다.

- .env 파일의 내용은 다음과 같습니다.  
  PORT = 포트번호
  DBUSER = "데이터 베이스 계정"
  DBPASSWORD = "데이터 베이스 비밀번호"
  DB = "데이터 베이스 이름"

  PRIVATE_KEY = "JWT 시크릿 키"

  SENDGRID_USERNAME = "sendgrid 유저 이름"
  SENDGRID_PASSWORD = "sendgrid 비밀번호"

  KAKAO_API = "카카오 API 키"

  AWS_KEY = "아마존 키",
  AWS_PRIVATE_KEY = "아마존 키"

  SEOUL_DATA = "서울 공공 데이터 API 키"

  PASSWORD = "카카오 맵 데이터 수집을 위한 비밀번호"

## 3. npm start

- npm install과 .env 파일 작성이 끝났다면 npm start로 서버를 실행 시킬 수 있습니다.
