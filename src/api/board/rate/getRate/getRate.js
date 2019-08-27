import { Rate } from "../../../../../models/index";

export default {
  Query: {
    getRate: (_, args, { req }) => {
      const { userinfo } = req;
      const { hospital } = args;
      let isLogin = Boolean;
      let meRate = 0;
      if (userinfo !== undefined && userinfo.id !== undefined) {
        isLogin = true;
      } else {
        isLogin = false;
      }

      return Rate.findAll({
        where: { hospital }
      })
        .then(rate => {
          // rate를 다 더해주고
          // rate의 평균을 구하기 위해 length 만큼 나눠준다.
          // 내 점수가 있는지도 확인해야하기 때문에 토큰의 id를 꺼내서
          // 있다면 meRate에 넣어준다.

          if (rate.length > 0) {
            let sumRate = 0;
            let averRate = 0;
            for (let i = 0; i < rate.length; i += 1) {
              sumRate += rate[i].rating;
              if (userinfo.id !== undefined && rate[i].user === userinfo.id) {
                meRate = rate[i].rating;
              }
            }

            averRate = Math.floor(sumRate / rate.length);

            return {
              success: true,
              meRate,
              err: null,
              isLogin,
              rate: averRate
            };
          }

          return {
            success: true,
            meRate,
            err: "can't find Rate",
            isLogin,
            rate: 0
          };
        })
        .catch(err => ({
          success: false,
          err,
          meRate: null,
          isLogin,
          rate: null
        }));
    }
  }
};
