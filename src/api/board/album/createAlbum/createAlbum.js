import { Board } from "../../../../../models/index";

export default {
  Mutation: {
    createAlbum: async (_, args, { req }) => {
      const { userinfo } = req;
      if (userinfo !== undefined && userinfo.id !== undefined) {
        const { title, content, creator, boardName } = args;
        let location =
          "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png";
        if (req.file !== undefined) {
          location = req.file.Location;
        }
        return Board.create({
          creator,
          title,
          content,
          boardName,
          photo: location
        })
          .then(board => {
            return {
              success: true,
              board,
              err: null,
              isLogin: true
            };
          })
          .catch(err => {
            return {
              success: false,
              board: null,
              err,
              isLogin: true
            };
          });
      }
      return {
        success: false,
        board: null,
        err: "token expire",
        isLogin: false
      };
    }
  }
};
