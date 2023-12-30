
import { EnumErrorCode } from "../enum/EnumErrorCode";
import { EnumWorkOrderState } from "../enum/EnumWorkOrderState";
import { IRPCService } from "../interface/IRPCService";
import { MsgBasic } from "../protocols/MsgBasic";
import { Tools } from "../utils/Tools";


export interface IMsg extends MsgBasic {}
//**工单 */
export class WorkOrderInfo {

    /**
     * 当前工单的id
     *
     * @type {string}
     * @memberof WorkOrderInfo
     */
    public uid: string = Tools.getUID();

    /**
     * 要处理的工单id
     *
     * @type {string}
     * @memberof WorkOrderInfo
     */
    public orderid?:string;

    public createtime: number = Tools.getServerTime();

    public state: EnumWorkOrderState = EnumWorkOrderState.Normal;

    public body:IMsg;

    public from:IRPCService = null;

    public to:IRPCService = null;

    /**
     * 订单处理完成回调函数
     *
     * @type {*}
     * @memberof WorkOrderInfo
     */
    public callback:(code:EnumErrorCode,msg?:IMsg)=>void;
    
    
}