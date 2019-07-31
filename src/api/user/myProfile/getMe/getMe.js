import { User } from "../../../../../models/index";

export default {
  Query: {
    getMe: (_, args, { req }) => {
      const { nickName } = args;
      const isMe = nickName === req.nickName ? true : false;

      return User.findOne({ where: { nickName } })
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
