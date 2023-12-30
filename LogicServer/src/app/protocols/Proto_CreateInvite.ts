import { MsgBasic } from "../../common/protocols/MsgBasic";
import { EnumJobType } from "../enum/EnumJobType";
import { EnumWorkState } from "../enum/EnumWorkState";

export class CS_CreateInvite extends MsgBasic{
    
    
    public title: string = "";


    
    public desc: string = "";

    
    public mode: string = "";

    
    public jobType: EnumJobType = EnumJobType.Other; //职业


    
    public province: string = ""; //省份

    
    public city: string = ""; //城市


    
    public work_state: EnumWorkState = EnumWorkState.FREELANCE; //工作状态

    
    public pay: string = "";

    public count:number = 1;    //招聘人数

    public projectid:number  = 1; //项目id
}

export class SC_CreateInvite extends MsgBasic{
    public inviteid:number = 0;
}
