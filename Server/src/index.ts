import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const PROTO_PATH =   `${__dirname}/../proto/CallMessage.proto`;
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const myService = grpc.loadPackageDefinition(packageDefinition).CallMessage;

console.log("test");
//__dirname + "/../.
