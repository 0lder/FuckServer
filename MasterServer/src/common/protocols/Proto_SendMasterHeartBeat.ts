import { EnumProtocolType } from "./EnumProtocolType";
import { MsgBasic } from "./MsgBasic";
import { IRPCService } from "../interface/IRPCService";
import { Tools } from "../utils/Tools";

export class CS_SendMasterHeartBeat extends MsgBasic {
    public cmdid: EnumProtocolType = EnumProtocolType.CS_SendMasterHeartBeat;

    /**
     * 请求时间
     *
     * @type {number}
     * @memberof CS_SendMasterHeartBeat
     */
    public request_time: number = Tools.getServerTime();


    /**
     * 请求服务的rpc信息
     *
     * @type {IRPCService}
     * @memberof CS_SendMasterHeartBeat
     */
    public service: IRPCService;

}


export class SC_SendMasterHeartBeat extends MsgBasic {
    public cmdid: EnumProtocolType = EnumProtocolType.SC_SendHeartBeat;

    public services: { [key: string]: IRPCService } = {};

    /**
     * 回复时间
     *
     * @type {number}
     * @memberof SC_SendMasterHeartBeat
     */
    public response_time: number = Tools.getServerTime();
}