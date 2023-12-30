import { MsgBasic } from "../../common/protocols/MsgBasic";

export class CS_DeleteProject extends MsgBasic{

    public projectid:number = 0; //项目id
}

export class SC_DeleteProject extends MsgBasic{

    public projectid:number = 0; //项目id
}