import { MsgBasic } from "../../common/protocols/MsgBasic";


export class CS_Register {
    public nickname: string;

    public email: string;

    public phone:number;

    public password: string;
}

export class SC_Register extends MsgBasic {
    public userid:number;

}  