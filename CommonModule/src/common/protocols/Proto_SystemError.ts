import { EnumProtocolType } from "./EnumProtocolType";
import { MsgBasic } from "./MsgBasic";

export class SC_SystemError extends MsgBasic {
    
    public cmdid: EnumProtocolType = EnumProtocolType.SC_SystemError;
}