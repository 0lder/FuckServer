import { EnumErrorCode } from "../enum/EnumErrorCode";
import { Tools } from "../utils/Tools";
import { EnumProtocolType } from "./EnumProtocolType";


export interface IMsgExtraInfo {

}
export class MsgBasic {

    public cmdid: EnumProtocolType = EnumProtocolType.Unknow;
    public code: EnumErrorCode = EnumErrorCode.OK;
    public tips: string = EnumErrorCode[EnumErrorCode.OK];
    public uid: string = Tools.getUID();

    public tip(code: EnumErrorCode) {
        this.tips = EnumErrorCode[code];
        this.code = code;
    }
}