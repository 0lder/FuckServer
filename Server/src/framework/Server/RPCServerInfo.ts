import { EnumServerType } from "../../enums/EnumServerType";

export class RPCServerInfo {

    public uid: string;


    public serverName:string;


    public serverType:EnumServerType = EnumServerType.Master;

    //**内网ip */
    public privateIP:string;

    //**公网IP */
    public publicIP:string;
    
    public port:number;
}