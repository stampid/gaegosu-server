import passport from "passport";
import passportKakao from "passport-kakao";
import dotenv from "dotenv";

dotenv.config();

const KakaoStrategy = passportKakao.Strategy;

const kakaoKey = {
  clientID: process.env.KAKAO_API,
  clientSecret: "",
  callbackURL: "http://localhost:4000/oauth"
};

passport.use(
  "kakao-SignUp",
  new KakaoStrategy(kakaoKey, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    done(null, profile);
  })
);

passport.use(
  "kakao-SignIn",
  new KakaoStrategy(kakaoKey, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    done(null, profile);
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
