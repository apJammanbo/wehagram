// env 파일 읽기
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./shcema";

/**
 * GraphQLServer 생성
 */
const server = new GraphQLServer({ schema });

/**
 * 미들웨어 설정
 */
server.express.use(logger("dev"));
export default server;
