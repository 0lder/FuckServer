import { MsgBasic } from "../../common/protocols/MsgBasic";


/**
 * 登录
 *
 * @export
 * @class CS_Login
 * @extends {MsgBasic}
 */
export class CS_Login extends MsgBasic {
    public email: string = "";
    public password: string = "";
}

/**
 * 登录
 *
 * @export
 * @class SC_Login
 * @extends {MsgBasic}
 */
export class SC_Login extends MsgBasic{
    public userid:number = 0;
    public name:string = "";
    public session:string = "";
}