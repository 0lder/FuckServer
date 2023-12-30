import { MsgBasic } from "../../common/protocols/MsgBasic";

export class CS_DeleteInvite extends MsgBasic{
    
    public inviteid:number = 0; // 邀请id

    public projectid:number = 0; // 项目id
}

export class SC_DeleteInvite extends MsgBasic{
    
    public inviteid:number = 0; // 邀请id

    public projectid:number = 0; // 项目id
}