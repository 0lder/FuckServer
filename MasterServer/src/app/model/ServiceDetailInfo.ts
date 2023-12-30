import { IRPCService } from "../../common/interface/IRPCService";
import { EnumServiceState } from "../enums/EnumServiceState";

export class ServiceDetailInfo {

    public info: IRPCService;


    public heartBeatExpireTime: number; //**心跳过期时间 */


    public state: EnumServiceState = EnumServiceState.normal; //**服务当前状态 */


}