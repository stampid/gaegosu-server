import { User } from "../../models/index";
import { createJWT } from "../middleWare/jwtHelper";

// export const kakaoSignUp = (req, res) => {
//   console.log("!!!!!!!!!!!!!!!!!", req.headers);
//   res.send(req.user);
// };

export const kakaoSign = async (req, res) => {
  const { user } = req;
  const nickName = user.username;
  const email = user.id;
  const {
    provider,
    _json: {
      properties: { profile_image }
    }
  } = user;

  return User.findOne({
    where: { email, admin: false, provider }
  })
    .then(data => {
      if (data) {
        const token = createJWT({ id: data.id });

        res.redirect(
          `http://gaegosu-client.s3-website.ap-northeast-2.amazonaws.com/#/kakao/${token}`
        );

        return;
      }

      User.create({
        email,
        nickName,
        admin: false,
        profileImage: profile_image,
        provider
      }).then(newdata => {
        const token = createJWT({
          id: newdata.id
        });

        res.redirect(
          `http://gaegosu-client.s3-website.ap-northeast-2.amazonaws.com/#/kakao/${token}`
        );
      });
    })
    .catch(err => console.log(err));
};

export const kakaofail = (req, res) => {
  res.redirect(
    `http://gaegosu-client.s3-website.ap-northeast-2.amazonaws.com/#/kakao/${null}`
  );
};
