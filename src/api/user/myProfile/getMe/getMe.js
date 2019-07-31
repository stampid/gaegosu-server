import { User } from "../../../../../models/index";

export default {
  Query: {
    getMe: (_, args, { req }) => {
      const { id, nickName } = args;
      const { userinfo } = req;
      let isMe = null;
      if (
        userinfo !== undefined &&
        userinfo.id === id &&
        userinfo.nickName === nickName
      ) {
        isMe = true;
      } else {
        isMe = false;
      }

      console.log(req.userinfo);
      return User.findOne({ where: { id, nickName } })
        .then(data => {
          if (data) {
            return {
              isMe,
              user: data,
              err: null
            };
          }
          return {
            isMe: false,
            user: null,
            err: "can't find user"
          };
        })
        .catch(err => {
          return {
            isMe: false,
            user: null,
            err
          };
        });
    }
  }
};
