import { MsgBasic } from "../../common/protocols/MsgBasic";

export class CS_ChangeName extends MsgBasic{
    public nickname:string = "";
}

export class SC_ChangeName extends MsgBasic{
    public nickname:string = "";
}