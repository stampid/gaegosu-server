import { User, Pet } from "../../../../../models/index";

export default {
  Mutation: {
    localsignUp: (_, args, { req }) => {
      const {
        nickName,
        email = "",
        password = "",
        provider = "local",
        admin = false,
        profileImage = "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
        pets
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
            if (pets) {
              const bulkPet = [];
              for (let i = 0; i < pets.length; i += 1) {
                pets[i].owner = data.id;
                bulkPet.push(pets[i]);
              }

              return Pet.bulkCreate(bulkPet)
                .then(_ => {
                  return {
                    status: true,
                    err: null
                  };
                })
                .catch(err => {
                  return {
                    status: false,
                    err
                  };
                });
            }
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
            err
          };
        });
    }
  }
};
