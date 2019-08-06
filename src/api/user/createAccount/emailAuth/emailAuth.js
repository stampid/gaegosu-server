import { User, EmailAuth } from "../../../../../models/index";
import { generateSecret, sendSecretMail } from "../../../../utils/email";

export default {
  Mutation: {
    emailSend: async (_, args) => {
      const { address } = args;

      const result = await User.findOne({
        where: { email: address }
      })
        .then(data => {
          console.log(data);
          if (data) {
            console.log("이메일 있음");
            return false;
          }

          const randomWord = generateSecret();
          sendSecretMail(address, randomWord);

          return EmailAuth.create({ email: address, randomWord })
            .then(_ => {
              return true;
            })
            .catch(err => console.log(err));
        })
        .catch(err => {
          console.log(err);
        });

      return result;
    },

    emailAuth: async (_, args) => {
      const { address, randomWord } = args;

      const result = await EmailAuth.findOne({
        where: { email: address, randomWord },
        order: [["id", "DESC"]]
      })
        .then(data => {
          if (data) {
            return EmailAuth.destroy({ where: { email: address } })
              .then(_ => true)
              .catch(err => console.log(err));
          }

          return false;
        })
        .catch(err => console.log(err));

      return result;
    }
  }
};
