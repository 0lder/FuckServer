import { MsgBasic } from "../../common/protocols/MsgBasic";
import { Invite } from "../entity/Invite";
import { EnumJobType } from "../enum/EnumJobType";
import { EnumProjectState } from "../enum/EnumProjectState";
import { EnumProjectType } from "../enum/EnumProjectType";

/**
 * 获取邀请列表
 *
 * @export
 * @class CS_GetInviteList
 * @extends {MsgBasic}
 */
export class CS_GetInviteList extends MsgBasic {
    public page:number = 0;// 页码

    public jobytype:EnumJobType; // 职位类型

    public projectState:EnumProjectState; // 项目状态

    public province:string; // 省份

    public city:string; // 城市 

    public projectType:EnumProjectType; // 项目类型
}



/**
 * 获取邀请列表
 *
 * @export
 * @class SC_GetInviteList
 * @extends {MsgBasic}
 */
export class SC_GetInviteList extends MsgBasic {
    public inviteList:Invite[] = [];
}