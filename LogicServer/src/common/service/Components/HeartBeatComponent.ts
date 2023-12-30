import { ComponentBasic } from "../../ecs/Component/ComponentBasic";
import { EnumServiceType } from "../../enum/EnumServiceType";
import { CS_SendMasterHeartBeat, SC_SendMasterHeartBeat } from "../../protocols/Proto_SendMasterHeartBeat";
import { Log } from "../../utils/Log";
import { Tools } from "../../utils/Tools";
import { RPCComponent } from "./RPCComponent";

/**
 * 心跳组件
 *
 * @export
 * @class HeartBeatComponent
 * @extends {ComponentBasic}
 */
export class HeartBeatComponent extends ComponentBasic {

    /**
     * 上一次请求时间
     *
     * @private
     * @type {number}
     * @memberof HeartBeatComponent
     */
    private _lastRequestTime: number = 0;


    private _isSending: boolean = false;


    public do(): void {


    }


    private canSendHeartBeat(): boolean {
        const curTime: number = Tools.getServerTime();

        const delta: number = curTime - this._lastRequestTime;


        return delta >= 2 && !this._isSending;
    }

    public update(dt: number): void {

        if (!this.canSendHeartBeat()) {
            return;
        }

        this.sendMasterHeartBeat();

    }

    /**
     * 向master 发送心跳协议
     *
     * @memberof HeartBeatComponent
     */
    public sendMasterHeartBeat(): void {

        this._isSending = true;
        this._lastRequestTime = Tools.getServerTime();
        const rpcComp: RPCComponent = <RPCComponent>this.entity.getComponent(RPCComponent);

        const cs: CS_SendMasterHeartBeat = new CS_SendMasterHeartBeat();
        cs.service = rpcComp.getRPCConfig();
        rpcComp.callServiceByType(EnumServiceType.Master, cs, (error: any, msg: SC_SendMasterHeartBeat) => {
            this._isSending = false;
            if (error) {
                Log.error(`send master heartbeat error ${error}`);
                return;
            }
            rpcComp.setServices(msg.services);


        });

    }

}