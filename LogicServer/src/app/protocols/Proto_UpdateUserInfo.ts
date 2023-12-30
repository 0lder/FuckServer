import { MsgBasic } from "../../common/protocols/MsgBasic";

export class CS_UpdateUserInfo extends MsgBasic{
    public nickname:string = "";
    public province:string = "";
    public city:string = "";
    
}

export class SC_UpdateUserInfo extends MsgBasic{
    
}