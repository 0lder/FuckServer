import { EnumServiceType } from "../enum/EnumServiceType";
import { EnumProtocolType } from "../protocols/EnumProtocolType";
import { SERVER_VER } from "../const/Const";
import { IRPCService } from "../interface/IRPCService";
import _ from "lodash";
import { EntiyBasic } from "../ecs/Entity/EntityBasic";
import { RPCComponent } from "./Components/RPCComponent";
import { HeartBeatComponent } from "./Components/HeartBeatComponent";
import { ProtoHandlerComponent } from "./Components/ProtoHandlerComponent";
import { Tools } from "../utils/Tools";

export class ServiceBase extends EntiyBasic {

    public type: EnumServiceType = EnumServiceType.Logic;


    private _ver: string = SERVER_VER;

    private _protocolHandlers: { [key: number]: Function } = {};

    public _services: { [key: string]: IRPCService } = {};

    private _updateEnabled: boolean = false;

    private _lastUpdateTime: number = 0;

    private _intervalTime: number = 1000;

    public onStop(): void {

    }

    public onStart(): void {


    }

    public start(port: number): void {
        
        this.initBasicComponent(port);

    }



    /**
     * 初始化基础组件
     *
     * @private
     * @memberof ServiceBase
     */
    private initBasicComponent(port: number): void {
        const rpcComp: RPCComponent = new RPCComponent();
        rpcComp.setRPCPort(port);

        this.addComponent(rpcComp);
        this.addComponent(new ProtoHandlerComponent());

        if (!this.isMaster()) {
            //** 不是master需要增加心跳组件 */
            this.addComponent(new HeartBeatComponent());
        }
    }

    /**
     * 设置是否可以更新
     *
     * @param {boolean} enabled
     * @memberof ServiceBase
     */
    public setUpdateEnabled(enabled: boolean, intervaltime: number = 1000): void {


        if (this._updateEnabled === enabled) {
            return;
        }

        this._updateEnabled = enabled;

        this._intervalTime = intervaltime;

        if (this._updateEnabled) {

            this._lastUpdateTime = Tools.getServerTimeMS();
            const delta: number = Tools.getServerTimeMS() - this._lastUpdateTime;
            this._update(delta, Tools.getServerTime());
        }
    }


    /**
     * 
     *
     * @param {number} dt 秒级别
     * @memberof ServiceBase
     */
    private _update(dt: number, servertime: number): void {



        //**这里需要更新组件 */
        _.forEach(this.getAllComponents(), comp => {
            comp.update(dt, servertime);
        });
        this.onUpdate(dt, servertime);
        this._lastUpdateTime = Tools.getServerTimeMS();
        if (this._updateEnabled) {
            setTimeout(() => {
                const delta: number = Tools.getServerTimeMS() - this._lastUpdateTime;
                this._update(delta, Tools.getServerTime());
            }, this._intervalTime);
        }
    }


    /**
     * 子类可以重写这个方法
     *
     * @param {number} dt
     * @memberof ServiceBase
     */
    public onUpdate(dt: number, servertime: number): void {

    }

    /**
     * 是不是master服务
     *
     * @return {*}  {boolean}
     * @memberof ServiceBase
     */
    public isMaster(): boolean {
        return this.type === EnumServiceType.Master;
    }


    /**
     * 获取协议处理函数
     *
     * @param {EnumProtocolType} msgType
     * @return {*}  {Function}
     * @memberof ServiceBase
     */
    public getProtocolHandler(msgType: EnumProtocolType): Function {
        return this._protocolHandlers[msgType];
    }


   

} 