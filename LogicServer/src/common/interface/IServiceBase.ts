import { EnumServiceType } from "../enum/EnumServiceType";

export interface IServiceBase {
    
    uid: string;

    type:EnumServiceType;    
}