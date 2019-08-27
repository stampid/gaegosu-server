import { Rate } from "../../../../../models/index";

export default {
  Mutation: {
    giveRate: (_, args, { req }) => {
      const { userinfo } = req;

      if (userinfo !== undefined && userinfo.id !== undefined) {
        const { hospitalId, rate } = args;

        return Rate.findOne({
          where: {
            hospital: hospitalId,
            user: userinfo.id
          }
        }).then(data => {
          if (data) {
            return Rate.update(
              { rating: rate },
              { where: { hospital: hospitalId, user: userinfo.id } }
            )
              .then(_ => ({
                success: true,
                err: null,
                isLogin: true
              }))
              .catch(err => ({
                success: false,
                err,
                isLogin: true
              }));
          }

          return Rate.create({
            hospital: hospitalId,
            user: userinfo.id,
            rating: rate
          })
            .then(_ => ({
              success: true,
              err: null,
              isLogin: true
            }))
            .catch(err => ({
              success: false,
              err,
              isLogin: true
            }));
        });
      }

      return {
        success: false,
        err: "token expire",
        isLogin: false
      };
    }
  }
};
