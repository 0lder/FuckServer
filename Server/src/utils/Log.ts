import log4js from "log4js";
log4js.configure({
  appenders: { cheese: { type: "file", filename: "cheese.log" } },
  categories: { default: { appenders: ["cheese"], level: "error" } }
});


export class Log {


    public static logger:log4js.Logger = log4js.getLogger();

    public static debug(message,...args: any[]): void {
        console.debug(`[DEBUG]:${message}`,...args);
        this.logger.debug(`[DEBUG]:${message}`,...args);
    }

    public static info(message,...args: any[]): void {

        console.info(`[INFO]:${message}`,...args);
        this.logger.info(`[INFO]:${message}`,...args);
    }

    public static warn(message,...args: any[]): void {
        console.warn(`[WARN]:${message}`,...args);
        this.logger.warn(`[WARN]:${message}`,...args);
    }

    public static error(message,...args: any[]): void {

        console.error(`[ERROR]:${message}`,...args);
        this.logger.error(`[ERROR]:${message}`,...args);

    }

    public static success(message,...args: any[]): void {
        console.log(`[SUCCESS]:${message}`,...args);
        this.logger.info(`[SUCCESS]:${message}`,...args);
    }
}
Log.logger.level = log4js.levels.ERROR;