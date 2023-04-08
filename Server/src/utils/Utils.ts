import uid2 from "uid2";
import os from "os";
import http from "http";
import { readdirSync } from "fs";
import { readFile } from "fs/promises";

import { ClientRequest, IncomingMessage } from "http";
import https, { RequestOptions } from "https";
import querystring from "querystring";
/**
 * 工具类
 *
 * @export
 * @class Utils
 */
export class Utils {


    /**
     * 获取ipv4地址
     *
     * @static
     * @return {*}  {string}
     * @memberof Utils
     */
    public static getIPV4(): string {
        const infos = os.networkInterfaces();
        for (const key in infos) {

            const list = infos[key];
            for (const i of list) {
                if (i.family === "IPv4" && i.address !== "127.0.0.1") {
                    return i.address;
                }
            }
        }
    }



    public static httpGet(url: RequestOptions, callBack: (res: any, error?: Error) => void): void {

        const req: ClientRequest = https.get(url, (res: IncomingMessage) => {

            let str: string = "";
            res.setEncoding("utf-8");
            res.on("data", (chunk: any) => {
                str += chunk;
            });
            res.on("end", () => {
                callBack(str);
            });

        });
        req.on("error", (err: Error) => {
            callBack(undefined, err);
        });
    }
    public static httpsPost(options: RequestOptions, data: Object, callBack: (res: any, error?: Error) => void): void {
        options.method = "POST";

        const post_data: string = JSON.stringify(data);
        options.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length
        };

        const req: ClientRequest = https.request(options, (res: IncomingMessage) => {

            let str: string = "";
            res.setEncoding("utf-8");
            res.on("data", (chunk: any) => {
                str += chunk;
            });
            res.on("end", () => {
                callBack(str);
            });

        });
        req.on("error", (err: Error) => {
            callBack(undefined, err);
        });
        req.write(post_data);
        req.end();
    }

        /**
     *获取公网ip
     *
     * @return {*}  {Promise<string>}
     * @memberof RPCServer
     */
     public static getPublicIP(): Promise<string> {

        return new Promise((resolve, reject) => {

            http.get('http://api.ipify.org', (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    resolve(data);
                    //console.log('外网IP地址：', data);
                });
            }).on('error', (err) => {
                resolve(null);
                console.log('获取ip失败：', err.message);
            });
        });


    }


    /**
     *获取内网ip
     *
     * @return {*}  {string}
     * @memberof RPCServer
     */
    public  static getPrivateIP(): string {


        // 获取网络接口列表
        const networkInterfaces = os.networkInterfaces();

        // 遍历接口列表，查找内部IP地址
        let internalIp;
        Object.keys(networkInterfaces).forEach(interfaceName => {
            const interfaces = networkInterfaces[interfaceName];
            for (let i = 0; i < interfaces.length; i++) {
                const iface = interfaces[i];
                // 忽略非IPv4地址和loopback地址
                if (iface.family === 'IPv4' && !iface.internal) {
                    internalIp = iface.address;
                    break;
                }
            }

        });

        console.log('内部IP地址是:', internalIp);
        return internalIp;

    }

        /**
     *获取公网ip
     *
     * @return {*}  {Promise<string>}
     * @memberof RPCServer
     */
     public getPublicIP(): Promise<string> {

        return new Promise((resolve, reject) => {

            http.get('http://api.ipify.org', (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    resolve(data);
                    //console.log('外网IP地址：', data);
                });
            }).on('error', (err) => {
                resolve(null);
                console.log('获取ip失败：', err.message);
            });
        });


    }

}

export function getUID() {

    return uid2(10);
}

/**服务器时间 */
export function getServerTime() {

    return Math.floor(new Date().getTime() / 1000);
}

export function getServerTimeMS() {

    return Math.floor(new Date().getTime());
}