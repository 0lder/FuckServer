import { bind } from "lodash";
import { ServiceDetailInfo } from "../model/ServiceDetailInfo";
import _ from "lodash";
import { IMsg } from "../../common/model/WorkOrderInfo";
import { EnumProtocolType } from "../../common/protocols/EnumProtocolType";
import { ServiceBase } from "../../common/service/ServiceBase";
import { EnumServiceType } from "../../common/enum/EnumServiceType";
import { IRPCService } from "../../common/interface/IRPCService";
import { Log } from "../../common/utils/Log";
import { CS_SendMasterHeartBeat, SC_SendMasterHeartBeat } from "../../common/protocols/Proto_SendMasterHeartBeat";
import { ProtoHandlerComponent } from "../../common/service/Components/ProtoHandlerComponent";
import { Tools } from "../../common/utils/Tools";
export class MasterService extends ServiceBase {


    public type: EnumServiceType = EnumServiceType.Master;

    private static _instance: MasterService = null;


    /**
     * 服务的详细信息
     *
     * @private
     * @type {{ [key: string]: ServiceDetailInfo }}
     * @memberof MasterService
     */
    private _seviceDetails: { [key: string]: ServiceDetailInfo } = {};

    public static get inst(): MasterService {
        if (this._instance == null) {
            this._instance = new MasterService();
        }

        return this._instance;
    }

    // 启动服务
    public start(port: number): void {
        super.start(port);
        

        this.setUpdateEnabled(true, 1000);
        this.addProtocols();
    }



    public addProtocols(): void {
        const handlerComp: ProtoHandlerComponent = this.getComponent(ProtoHandlerComponent);
        handlerComp.addHander(EnumProtocolType.CS_SendMasterHeartBeat, bind(this._serviceHeatBeatHandler, this))
    }

    //**服务器停止 */
    public onStop(): void {

    }
    //**具体的协议处理 */
    private _serviceHeatBeatHandler(msg: CS_SendMasterHeartBeat, callback: (error?:any,msg?: IMsg) => void): void {

        const sc: SC_SendMasterHeartBeat = new SC_SendMasterHeartBeat();
        const service: IRPCService = msg.service;

        let detailInfo: ServiceDetailInfo = this._seviceDetails[service.service_uid];
        if (!detailInfo) {
            detailInfo = new ServiceDetailInfo();
            detailInfo.info = msg.service;
            this._services[service.service_uid] = msg.service;
            this._seviceDetails[service.service_uid] = detailInfo;
        }
        detailInfo.heartBeatExpireTime = Tools.getServerTime() + 5; //**默认5秒钟没有收到心跳就算超时 */

        Log.info(` receive service heart :${service.service_uid} ${service.service_type}`);
        sc.services = this._services;
        callback(null,sc);


    }

    public onUpdate(dt: number): void {

        //**做服务检查 */

        //**每5秒钟检查一次服务状态 */

        this._checkServiceState();
    }


    //** 检查所有service的状态 */
    private _checkServiceState(): void {
        const curTime: number = Tools.getServerTime();
        _.forEach(this._seviceDetails, service_detail => {


            if (service_detail.heartBeatExpireTime <= curTime) {
                //**心跳超时了，表明这个服务可能不存在了 */
                this._removeService(service_detail.info.service_uid);
            }

        });
    }

    /**
     *
     * 删除某个服务
     * @private
     * @param {string} service_id
     * @memberof MasterService
     */
    private _removeService(service_id: string): void {
        Log.info(`service ${service_id} is be removed`);
        if (this._services[service_id]) {
            delete this._services[service_id];
        }

        if (this._seviceDetails[service_id]) {
            delete this._seviceDetails[service_id];
        }


    }
}