import _, { forIn } from "lodash";
import { EnumEventType } from "../enum/EnumEventType";



/**
 * 消息分发中心
 *
 * @export
 * @class EventCenter
 */
export class EventCenter {

    private static _instance: EventCenter = null;

    public static get inst(): EventCenter {
        if (this._instance === null) {
            this._instance = new EventCenter();
        }
        return this._instance;
    }



    private _listeners: { [key: string]: { listener: any, handler: Function }[] } = {}


    public addEventListener(type: EnumEventType, handler: Function, listener: any): void {
        this._listeners[type] = this._listeners[type] ? this._listeners[type] : [];

        if (!handler) {
            return;
        }
        if (_.find(this._listeners[type], { listener: listener })) {
            return;
        }
        this._listeners[type].push({ listener: listener, handler: handler });
    }


    public removeEventListenersBylistener(listener: any): void {


        _.forEach(this._listeners, (listeners: { listener: any, handler: Function }[]) => {
            _.remove(listeners, { listener: listener });
        });
    }


    public sendEvent(type: EnumEventType, data: any): void {

        if (!this._listeners[type]) {
            return;
        }


        _.forEach(this._listeners[type], it => {

            if(it.handler){
                it.handler({type:type,data:data});
            }

        });
    }

}