import express from "express";
import { EnumServiceType } from "../../common/enum/EnumServiceType";
import { ServiceBase } from "../../common/service/ServiceBase";
import bodyParser from "body-parser";
import { DBManager } from "../manager/DBManager";
import { SC_SystemError } from "../protocols/Proto_SystemError";
import { EnumErrorCode } from "../../common/enum/EnumErrorCode";
import ConstRequestBodyConfig from "../router/RequestBodyConfig";
import { ClassManager } from "../manager/ClassManager";
import UserRouter from "../router/RouterUser";
import RouterInvite from "../router/RouterInvite";
import ProjectRouter from "../router/RouterProject";

export class LogicServer extends ServiceBase {

    public type: EnumServiceType = EnumServiceType.Logic;


    public start(port: number): void {
        super.start(port);

        this.setUpdateEnabled(true, 1000);
        //this.startHttpServer();

    }


    private startHttpServer(): void {
        // 写一个中间件 拦截请求
        const app = express()

        const jsonParser = bodyParser.json();
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(jsonParser);

        app.use((req, res, next) => {

            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By", '3.2.1');
            // 判断请求是 get 还是 post
            if (req.method === "GET") {
                console.log("get请求");
            } else if (req.method === "POST") {

            }

            if (req.url != "/user/login" && req.url != "/user/register") {
                console.log("登录请求");
                // 校验session

                if (!DBManager.inst.verifySession(req.body.session)) {
                    const sc: SC_SystemError = new SC_SystemError();
                    sc.tip(EnumErrorCode.Session_isInvalid);
                    res.send(sc);
                    return;
                }

            }

            //检查请求的数据字段类型是否符合标准
            const requestModel: any = ConstRequestBodyConfig[req.url];

            if (!requestModel) {
                const sc: SC_SystemError = new SC_SystemError();
                sc.tip(EnumErrorCode.Router_not_Exist);

                res.send(sc);
                return;
            }

            const ret: boolean = ClassManager.getInstance().verifyObject(req.body, requestModel);

            if (!ret) {
                const sc: SC_SystemError = new SC_SystemError();
                sc.tip(EnumErrorCode.ErrorParams);

                res.send(sc);
                return;
            }


            next();
        });

        app.use(UserRouter);
        app.use(ProjectRouter);
        app.use(RouterInvite);
        app.listen(3000, () => {
            DBManager.inst.connect();
            console.log(`server is started:3000`);
        });


    }
    public onUpdate(dt: number): void {


    }
}