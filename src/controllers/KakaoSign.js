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
  const { provider } = user;

  return User.findOne({
    where: { email, nickName, admin: false, provider }
  })
    .then(data => {
      if (data) {
        console.log(
          "!!!!!!!!!!!!!!!!!!data is case old-->!!!!!!!!!!!!!!!!!!!!!!"
        );
        const token = createJWT({ id: data.id, nickName: data.nickName });

        res.redirect(`http://localhost:3000/kakao?token=${token}`);

        // res.send({
        //   isLogin: true,
        //   user: data,
        //   err: null,
        //   token
        // });
        return;
      }

      // return User.create({
      User.create({
        email,
        nickName,
        admin: false,
        provider
      }).then(newdata => {
        console.log(
          "!!!!!!!!!!!!!!!!!!!!newdata is case new-->!!!!!!!!!!!!!!!!!!!!!"
        );
        const token = createJWT({
          id: newdata.id,
          nickName: newdata.nickName
        });

        res.redirect(`http://localhost:3000/kakao?token=${token}`);
        // res.send({
        //   isLogin: true,
        //   user: newdata,
        //   err: null,
        //   token
        // });
      });
    })
    .catch(err => console.log(err));
};

export const kakaofail = (req, res) => {
  res.redirect(`http://localhost:3000/kakao?token=${null}`);
  // res.send({
  //   isLogin: false,
  //   user: null,
  //   err: "fail to Sign with kakao, please try again.",
  //   token: null
  // });
};
