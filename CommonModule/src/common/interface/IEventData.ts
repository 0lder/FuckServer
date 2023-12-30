import { EnumEventType } from "../enum/EnumEventType";

export interface IEventData {
    type:EnumEventType;
    data:any;
}