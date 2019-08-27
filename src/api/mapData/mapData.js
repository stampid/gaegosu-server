import fetch from "node-fetch";
import { Map } from "../../../models/index";

export default {
  Query: {
    mapData: async (_, args) => {
      const { password, start, end } = args;
      if (password !== process.env.PASSWORD) {
        return false;
      }

      const url = `http://openapi.seoul.go.kr:8088/${
        process.env.SEOUL_DATA
      }/json/vtrHospitalInfo/${start}/${end}`;

      fetch(url)
        .then(seoulRes => seoulRes.json())
        .then(seoulData => {
          const {
            vtrHospitalInfo: { row }
          } = seoulData;

          return row;
        })
        .then(rowDatas => {
          for (let i = 0; i < rowDatas.length; i += 1) {
            fetch(
              `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${
                rowDatas[i].XCODE
              }&y=${rowDatas[i].YCODE}&input_coord=WTM`,
              {
                method: "GET",
                headers: {
                  Authorization: `KakaoAK ${process.env.KAKAO_API}`
                }
              }
            )
              .then(kakaoRes1 => kakaoRes1.json())
              .then(kakaojson1 => {
                console.log(kakaojson1);
                return kakaojson1.documents[0].address.address_name;
              })
              .then(address => {
                const fixAddress = encodeURIComponent(address);
                return fetch(
                  `https://dapi.kakao.com/v2/local/search/keyword.json?query=${fixAddress}`,
                  {
                    method: "GET",
                    headers: {
                      Authorization: `KakaoAK ${process.env.KAKAO_API}`
                    }
                  }
                );
              })
              .then(kakaoRes2 => kakaoRes2.json())
              .then(kakaoData => {
                // console.log(rowDatas[i].NM);
                const { documents } = kakaoData;
                for (let j = 0; j < documents.length; j += 1) {
                  if (
                    documents[j].category_name ===
                    "가정,생활 > 반려동물 > 동물병원"
                  ) {
                    return documents[j];
                  }
                }
                return null;
              })
              .then(data => {
                if (data) {
                  const { place_name, road_address_name, phone, x, y } = data;

                  return Map.create({
                    title: place_name,
                    roadAddress: road_address_name,
                    phone,
                    locationX: x,
                    locationY: y
                  });
                }

                return null;
              })
              .catch(err => {
                console.log(rowDatas[i].XCODE, rowDatas[i].YCODE);
                console.log("errrrrrrrr", err);
              });
          }
        })
        .catch(err => console.log(err));

      return true;
    }
  }
};
