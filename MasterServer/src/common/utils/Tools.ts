import uid2 from "uid2";
import os from "os";
import { format } from "date-fns";


/**
 * 工具类
 *
 * @export
 * @class Tools
 */
export class Tools {
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


    /**
     * 验证邮箱
     *
     * @static
     * @param {string} email
     * @return {*}  {boolean}
     * @memberof Utils
     */
    public static verifyEmail(email: string): boolean {
        const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        return reg.test(email);
    }

    /**
     * 验收手机号
     *
     * @static
     * @param {string} phone
     * @return {*}  {boolean}
     * @memberof Utils
     */
    public static verifyPhone(phone: string): boolean {
        const reg = /^1[3456789]\d{9}$/;
        return reg.test(phone);
    }


    /**
     * 验证密码
     *
     * @static
     * @param {string} password
     * @return {*}  {boolean}
     * @memberof Utils
     */
    public static verifyPassword(password: string): boolean {
        const reg = /^[a-zA-Z0-9]{6,16}$/;
        return reg.test(password);
    }

    // 对数组打乱顺序
    public static shuffle(arr: any[]) {
        for (let i = 0; i < arr.length; i++) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
        }
        return arr;
    }


    public static getCurrentTime(): string {

        return format(new Date(), "HH:mm:ss");
    }




    /**
     * 获取实例的类名
     *
     * @static
     * @param {*} obj
     * @return {*}  {string}
     * @memberof Utils
     */
    public static getClassName(obj: any): string {
        return obj.constructor.name;
    }



    /**
     * 唯一id
     *
     * @static
     * @return {*}  {string}
     * @memberof Utils
     */
    public static getUID():string {

        return uid2(10);
    }


    /**服务器时间 */
    public static  getServerTime() {

        return Math.floor(new Date().getTime() / 1000);
    }


    /**
     * 服务器时间毫秒级别
     *
     * @static
     * @return {*}  {number}
     * @memberof Tools
     */
    public static getServerTimeMS():number {

        return Math.floor(new Date().getTime());
    }


    //**服务器日期 */
    public static getServerDate():string {


        const today = new Date();
        const dateStr = today.getFullYear() + '-' + (today.getMonth() + 1) + '-'
            + today.getDate() + ' ' + today.getHours() + ':'
            + today.getMinutes() + ':' + today.getSeconds();
        return dateStr;
    }


}






