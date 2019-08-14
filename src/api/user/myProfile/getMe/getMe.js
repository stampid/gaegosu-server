import { User } from "../../../../../models/index";

export default {
  Query: {
    getMe: (_, __, { req }) => {
      const { userinfo } = req;
      let isMe;
      if (userinfo !== undefined && userinfo.id !== undefined) {
        const { id } = userinfo;
        isMe = true;

        return User.findOne({ where: { id } })
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

      return {
        isMe: false,
        user: null,
        err: "token expire"
      };
    }
  }
};
