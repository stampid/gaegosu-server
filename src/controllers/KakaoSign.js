import { User } from "../../models/index";
import { createJWT } from "../middleWare/jwtHelper";

// export const kakaoSignUp = (req, res) => {
//   console.log("!!!!!!!!!!!!!!!!!", req.headers);
//   res.send(req.user);
// };

const kakaoSign = async (req, res) => {
  // login 에서는 받은  profile 을  DB 랑 비교한당

  // req.user = profile

  const { user } = req;
  const nickName = user.username;
  const email = user.id;
  const { provider } = user;

  console.log("provider-->", req.provider);
  return User.findOne({
    where: { email, nickName, admin: false, provider }
  })
    .then(data => {
      if (data) {
        console.log("data is case old-->", data);
        const token = createJWT({ id: data.id, nickName: data.nickName });
        res.send({
          isLogin: true,
          user: data,
          err: null,
          token
        });
        return;
      }
      return User.create({
        email,
        nickName,
        admin: false,
        provider
      }).then(newdata => {
        console.log("newdata is case new-->", newdata);
        const token = createJWT({
          id: newdata.id,
          nickName: newdata.nickName
        });
        res.send({
          isLogin: true,
          user: newdata,
          err: null,
          token
        });
      });
    })
    .catch(err => console.log(err));
};

export default kakaoSign;
