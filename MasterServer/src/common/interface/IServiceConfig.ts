export interface IServiceConfig{
    
    uid: string;

    innerIP: string; // 内网ip

    externalIP?: string; // 外网ip

    port: number; // 端口号

    serviceType: string; // 服务类型
}