import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./shcema";
import { sendSecretMail } from "./util";

/**
 * GraphQLServer 생성
 */
const server = new GraphQLServer({ schema });

/**
 * 미들웨어 설정
 */
server.express.use(logger("dev"));
export default server;
