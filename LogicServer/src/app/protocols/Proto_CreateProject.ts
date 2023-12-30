import { EnumErrorCode } from "../../common/enum/EnumErrorCode";
import { MsgBasic } from "../../common/protocols/MsgBasic";
import { Project } from "../entity/Project";
import { EnumJobType } from "../enum/EnumJobType";
import { EnumProjectState } from "../enum/EnumProjectState";
import { EnumProjectType } from "../enum/EnumProjectType";


export class CS_CreateProject extends MsgBasic{

    public name: string = ""; //

    public desc:string =  ""; //项目描述

    public state:EnumProjectState = EnumProjectState.Developing; //项目状态

    public type:EnumProjectType = EnumProjectType.Other; //项目类型


    public members:{type:EnumJobType, count:number}[] = []; //成员列表

    
}

export class SC_CreateProject extends MsgBasic{

    public project:Project; //项目id

    public errorcode:EnumErrorCode = EnumErrorCode.OK; //错误码

}