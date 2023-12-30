;
import { IRPCService } from "../interface/IRPCService";
import { EnumProtocolType } from "./EnumProtocolType";
import { MsgBasic } from "./MsgBasic";




export class CS_SyncServiceList extends MsgBasic {

    public cmdid: EnumProtocolType = EnumProtocolType.CS_SyncServiceList;

    public services: {[key:string]:IRPCService}  = { };
}
export class SC_SyncServiceList extends MsgBasic {

    public cmdid: EnumProtocolType = EnumProtocolType.SC_SyncServiceList;

    
}