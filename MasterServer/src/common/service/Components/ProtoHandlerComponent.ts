import { ComponentBasic } from "../../ecs/Component/ComponentBasic";
import { IMsg } from "../../model/WorkOrderInfo";
import { EnumProtocolType } from "../../protocols/EnumProtocolType";
import { EnumErrorCode } from "../../enum/EnumErrorCode";


/**
 * 协议处理组件 每个协议都会对应一个handler进行处理
 *
 * @export
 * @class ProtoHandlerComponent
 * @extends {ComponentBasic}
 */
export class ProtoHandlerComponent extends ComponentBasic {

    private _protocolHandlers: { [key: number]: Function } = {};

    /**
     * 增加handler
     *
     * @param {EnumProtocolType} type
     * @param {Function} handler
     * @memberof ProtoHandlerComponent
     */
    public addHander(type: EnumProtocolType, handler: Function): void {


        this._protocolHandlers[type] = handler;
    }



    /**
     * 移除handler
     *
     * @param {EnumProtocolType} type
     * @memberof ProtoHandlerComponent
     */
    public removeHandler(type: EnumProtocolType): void {
        if (this._protocolHandlers[type]) {
            delete this._protocolHandlers[type];
        }
    }



    /**
     * 获取handler
     *
     * @param {EnumProtocolType} type
     * @return {*}  {Function}
     * @memberof ProtoHandlerComponent
     */
    public getHandler(type: EnumProtocolType): Function {

        return this._protocolHandlers[type];

    }

    /**
     * 执行handler
     *
     * @param {IMsg} msg
     * @param {Function} callback
     * @return {*}  {boolean}
     * @memberof ProtoHandlerComponent
     */
    public doHandler(msg: IMsg, callback: Function): void {

        const hanlder: Function = this._protocolHandlers[msg.cmdid];


        if (hanlder) {

            hanlder(msg, callback);
        }
        else {
            callback(EnumErrorCode.ServiceNotFoundHandler);

        }
    }

}