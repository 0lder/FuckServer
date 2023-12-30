import { SERVER_VER } from "../const/Const";
import { IRPCService } from "../interface/IRPCService";
import { EnumProtocolType } from "./EnumProtocolType";
import { MsgBasic } from "./MsgBasic";

export class CS_RegisterService extends MsgBasic {
    public cmdid: EnumProtocolType = EnumProtocolType.CS_RegisterService;

    public service: IRPCService;

}

export class SC_RegisterService extends MsgBasic {
    public cmdid: EnumProtocolType = EnumProtocolType.SC_RegisterService;
    /**
     * 当前中心服所有的服务列表
     *
     *
     * @type {IRPCService[]}
     * @memberof SC_RegisterService
     */
    public services: {[key:string]:IRPCService}  = { };
}