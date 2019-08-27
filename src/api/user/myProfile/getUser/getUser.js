import { User } from "../../../../../models/index";

export default {
  Query: {
    getUser: (_, args, { req }) => {
      const { id } = args;
      const { userinfo } = req;
      let isMe = null;
      if (userinfo !== undefined && userinfo.id === id) {
        isMe = true;
      } else {
        isMe = false;
      }

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
  }
};
