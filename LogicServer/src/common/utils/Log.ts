import * as log4js from "log4js";
import { Tools } from "./Tools";
import { ar } from "date-fns/locale";
export class Log {


    private static _logger: log4js.Logger = log4js.getLogger();

    private static _level: string = "debug";


    private static _enableConsoleLog: boolean = true;


    public static enabledConsoleLog(val: boolean) {
        this._enableConsoleLog = val;
    }
    public static get level(): string {
        return this._level;
    }

    public static set level(val: string) {
        this._level = val;
        this._logger.level = val;

    }

    public static debug(...args: any): void {
        this._logger.debug(args);
        this.consolelog("debug",args);

    }

    public static info(...args: any): void {

        this._logger.info(args);
        this.consolelog("info",args);
    }


    public static warn(...args: any): void {
        this._logger.warn(args);
        this.consolelog("warn",args);
    }

    public static error(...args: any): void {
        this._logger.error(args);

        this.consolelog("error",args);
    }

    public static consolelog(level:string,...args:any):void{
        if(!this._enableConsoleLog){
            return;
        }
        let color:string;
        switch(color){
            case "info":{
                color = '\x1b[32m';
                break;
            }
            case "warn":{
                color = "\x1b[33m";
                break;
            }
            case "error":{
                color = "\x1b[31m";
                break;
            }
            default:{
                color = "\x1b[0m";
            }

            console.log(`${color}${Tools.getCurrentTime()}[${level}] ${args}`);
        }
    }


}