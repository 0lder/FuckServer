import { MsgBasic } from "../../common/protocols/MsgBasic";
import { Project } from "../entity/Project";
import { EnumJobType } from "../enum/EnumJobType";
import { EnumProjectState } from "../enum/EnumProjectState";
import { EnumProjectType } from "../enum/EnumProjectType";

export class CS_EditProject extends MsgBasic{
    

    public projectid:number = 0; //项目id
    
    public name: string = ""; //

    public desc:string =  ""; //项目描述

    public state:EnumProjectState = EnumProjectState.Developing; //项目状态

    public type:EnumProjectType = EnumProjectType.Other; //项目类型


    public members:{type:EnumJobType, count:number}[] = []; //成员列表
}


export class SC_EditProject extends MsgBasic{

    public project:Project = null;

}