import { toNumber } from "lodash";
import { LogicServer } from "./app/server/LogicServer";

const args:string[] = process.argv.slice(2);
const server:LogicServer = new LogicServer();
server.start(toNumber(args[0]));
