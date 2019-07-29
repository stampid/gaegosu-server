import { User } from "../../../../../models/index";

export default {
  Mutation: {
    localsignUp: (_, args) => {
      const {
        nickName,
        email = "",
        password = "",
        profileImage = "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
        provider = "local",
        admin = false
      } = args;

      return User.create({
        nickName,
        email,
        password,
        profileImage,
        provider,
        admin
      })
        .then(data => {
          if (data) {
            return {
              status: true,
              err: null
            };
          }

          return {
            status: false,
            err: "failed account create"
          };
        })
        .catch(err => {
          return {
            status: false,
            err: err.errors[0].message
          };
        });
    }
  }
};
