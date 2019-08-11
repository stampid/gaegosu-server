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
    where: { email, nickName, admin: false, provider }
  })
    .then(data => {
      if (data) {
        const token = createJWT({ id: data.id, nickName: data.nickName });

        res.redirect(`http://localhost:3000/kakao?token=${token}`);

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
          id: newdata.id,
          nickName: newdata.nickName
        });

        res.redirect(`http://localhost:3000/kakao?token=${token}`);
      });
    })
    .catch(err => console.log(err));
};

export const kakaofail = (req, res) => {
  res.redirect(`http://localhost:3000/kakao?token=${null}`);
};
