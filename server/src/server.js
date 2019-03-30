import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./shcema";
import "./passport";
import { authenticateJwt } from "./passport";
/**
 * GraphQLServer 생성
 */
const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request })
});

/**
 * 미들웨어 설정
 */
server.express.use(logger("dev"));
server.express.use(authenticateJwt);
export default server;
