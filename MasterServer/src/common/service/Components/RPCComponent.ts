import { ComponentBasic } from "../../ecs/Component/ComponentBasic";

import * as jayson from "jayson";
import { IMsg, WorkOrderInfo } from "../../model/WorkOrderInfo";
import { IRPCService } from "../../interface/IRPCService";
import { EnumServiceType } from "../../enum/EnumServiceType";
import { MASTER_CONFIG, SERVER_VER } from "../../const/Const";
import { ServiceBase } from "../ServiceBase";
import { Log } from "../../utils/Log";
import _ from "lodash";
import { EnumErrorCode } from "../../enum/EnumErrorCode";

import { ProtoHandlerComponent } from "./ProtoHandlerComponent";
import { Tools } from "../../utils/Tools";
/**
 * rpc 组件
 *
 * @export
 * @class RPCComponent
 * @extends {ComponentBasic}
 */
export class RPCComponent extends ComponentBasic {



    /**
     * rpc端口号
     *
     * @private
     * @type {number}
     * @memberof RPCComponent
     */
    private _rpcPort: number = 0;

    /**
     * 所有rpc待处理的订单
     *
     * @private
     * @type {{ [key: string]: WorkOrderInfo }}
     * @memberof RPCComponent
     */
    private _orders: { [key: string]: WorkOrderInfo } = {};



    /**
     * rpcservice信息
     *
     * @private
     * @type {IRPCService}
     * @memberof RPCComponent
     */
    private _rpcService: IRPCService = null;


    /**
     * 所有的services信息
     *
     * @private
     * @type {{ [key: string]: IRPCService }}
     * @memberof RPCComponent
     */
    private _services: { [key: string]: IRPCService } = {};



    /**
     * rpc服务器
     *
     * @private
     * @type {jayson.Server}
     * @memberof RPCComponent
     */
    private _server: jayson.Server = null;


    public onStart(): void {

        const server: ServiceBase = <ServiceBase>this.entity;
        this._rpcService = { service_type: server.type, port: this._rpcPort, inner_ip: "127.0.0.1", service_uid: server.uid, ver: SERVER_VER };

        this._startRPCServer();
    }



    public setRPCPort(port: number): void {
        this._rpcPort = port;
    }


    //**启动rpc服务 */
    private _startRPCServer(): void {

        this._server = new jayson.Server({
            rpc: (args: any[], callback: any) => {
                const order: WorkOrderInfo = args[0];
                this._doOrder(order, callback);
            }
        });

        this._server.http().listen(this._rpcPort);

    }


    private _doOrder(order: WorkOrderInfo, callback?: (error?: any, response?: any) => void): void {


        if (order.orderid) {
            //** 有orderid 是对某个订单的回复 */


            if (this._orders[order.orderid]) {
                this._orders[order.orderid].callback(null, order.body);
                delete this._orders[order.orderid];
            }
            else {
                Log.error(`没有找到该服务`);
            }
        }
        else {
            const server: ServiceBase = <ServiceBase>this.entity;
            //** 查询是否有处理该协议的方法 */
            
            const resp_order: WorkOrderInfo = new WorkOrderInfo();
            resp_order.uid = Tools.getUID();
            resp_order.to = order.from;
            resp_order.from = this.getRPCConfig();
            resp_order.orderid = order.uid;


            const protoComp: ProtoHandlerComponent = server.getComponent(ProtoHandlerComponent);

            const respCallBack = (error: any, resp: IMsg) => {
                resp_order.body = resp;
                if (resp) {
                    callback(error, resp_order);
                }
                else {
                    callback(error);
                }
            };

            //**交给协议组件去处理 */
            protoComp.doHandler(order.body, respCallBack);


        }
    }

    private _getServiceById(service_id: string): IRPCService {

        const service: IRPCService = this._services[service_id];

        if (!service) {
            return;
        }
        return service;
    }


    /**
     * 根据类型获取service
     *
     * @private
     * @param {EnumServiceType} service_type
     * @return {*}  {IRPCService}
     * @memberof ServiceBase
     */
    private _getServiceByType(service_type: EnumServiceType): IRPCService {

        let service: IRPCService = null;
        if (service_type === EnumServiceType.Master) {
            service = { inner_ip: MASTER_CONFIG.HOST, port: MASTER_CONFIG.PORT, service_uid: "", service_type: EnumServiceType.Master, ver: SERVER_VER };
        }
        else {
            //** 从所有service中 */
            const serviceArray = [];
            _.forEach(this._services, ser => {
                if (ser.service_type === service_type) {
                    serviceArray.push(ser);
                }
            });
            if (serviceArray.length > 0) {
                service = _.sample(serviceArray);
            }
        }


        if (!service) {
            return;
        }
        return service;
    }

    private callServiceMethod(service: IRPCService, data: IMsg, callback: any): void {
        const order: WorkOrderInfo = new WorkOrderInfo();
        order.to = service;
        order.body = data;
        order.from = this._rpcService;
        order.callback = callback;
        //** 待处理的订单需要暂存起来 */
        this._orders[order.uid] = order;
        const rpc = jayson.Client.http({ host: service.inner_ip, port: service.port });
        rpc.request("rpc", [order], (error: any, resp: any) => {

            if (error) {
                Log.error(`send rpc error ${error}`);
                return;
            }

            if (resp && resp.result) {
                this._doOrder(resp.result,callback);
            }
            else {
                Log.error(`rpc response error ${resp.error}`);
            }

        });


    }


    /**
     * 调用某个服务
     *
     * @param {EnumServiceType} type
     * @param {IMsg} data
     * @param {*} callback
     * @memberof RPCComponent
     */
    public callServiceByType(type: EnumServiceType, data: IMsg, callback: any): void {

        const service: IRPCService = this._getServiceByType(type);

        if (!service) {

            return;
        }

        this.callServiceMethod(service, data, callback);
    }


    public getRPCConfig(): IRPCService {
        return this._rpcService;
    }


    public setServices(services: { [key: string]: IRPCService }): void {
        this._services = services;
    }


    public update(dt: number, servertime: number): void {

    }
}