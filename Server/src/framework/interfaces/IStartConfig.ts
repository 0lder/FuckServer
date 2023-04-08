export interface IStartConfig {

    master: {
        ip: string;
        port: number;
    };

    servers:{[key:string]:{name:string,port:number}[]};
    mysql: { 
        ip: string;
        port: number;
        username: string;
        password: string; 
    };
}