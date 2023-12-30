import { EnumServiceType } from "../enum/EnumServiceType";

export interface IRPCService{
    
    service_uid: string;

    inner_ip: string; // 内网ip

    external_ip?: string; // 外网ip

    port: number; // 端口号

    service_type:EnumServiceType;

    ver: string;
}