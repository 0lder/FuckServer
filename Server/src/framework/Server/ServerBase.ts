import { RPCServerInfo } from "./RPCServerInfo";

export class ServerBase {


    //**进程id */
    private _pid: string;

    //**服务名称 */
    private _serverName: string;

    //**外网ip */
    private _remoteIP: string;

    //**本地ip */
    private _privateIP: string;


    private _myRPCServerInfo: RPCServerInfo;

    constructor() {

    }


    public start(): void {

        
    }
}