import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
// graphQL 스키마에서 사용될 모듈
import { makeExecutableSchema } from "graphql-tools";
import path from "path";

const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
// 모든 api 폴더 안에 있는 graphQL 스키마 가져오기
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));
// 모든 api 폴더 안에 있는 resolver file 가져오기 (*다른 js file 이 있으면 오류발생! -> 모두 js 형식이라서)
const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers)
});
// 스키마 정의 (복수의 타입과 resolver 함수를 모두 받아오려면 merge 한 함수를 사용)

export default schema;
