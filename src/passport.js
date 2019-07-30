import passport from "passport";
import passportKakao from "passport-kakao";
import { User } from "../models/index";

const KakaoStrategy = passportKakao.Strategy;

const kakaoKey = {
  clientID: "ffca1c967752ddb8d65ef5e6fbfe0d2a",
  clientSecret: "",
  callbackURL: "http://localhost:4000/oauth"
};

passport.use(
  "kakao",
  new KakaoStrategy(kakaoKey, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    // const { provider, id } = profile;
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
