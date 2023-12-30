import express from "express";
import _ from "lodash";
import { Invite } from "../entity/Invite";
import { Project } from "../entity/Project";
import { User } from "../entity/User";
import { DBManager } from "../manager/DBManager";
import { CS_DeleteInvite } from "../protocols/Proto_DeleteInvite";
import { CS_CreateInvite } from "../protocols/Proto_CreateInvite";
import { CS_GetInviteList } from "../protocols/Proto_GetInviteList";
import { EnumErrorCode } from "../../common/enum/EnumErrorCode";

const RouterInvite  = express.Router();

RouterInvite.post("/invite/create", async (req, res) => {

    const cs: CS_CreateInvite = req.body;

    const user: User = req.body._user;

    // 查找项目是否存在
    // const project: Project = _.find(user.projects, { id: cs.projectid });

    // if (!project) {
    //     res.send({ code: EnumErrorCode.Project_Not_Exist });
    //     return;
    // }

    // const invite: Invite = new Invite();
    // invite.project = project;
    // invite.title = cs.title;
    // invite.count = cs.count;
    // invite.jobType = cs.jobType;
    // invite.mode = cs.mode;
    // invite.province = cs.province;
    // invite.city = cs.city;
    // invite.desc = cs.desc;
    // invite.pay = cs.pay;
    // invite.work_state = cs.work_state;
    
    // project.invites.push(invite);

    // try {
    //     await DBManager.inst.saveInvite(invite);
    //     await DBManager.inst.saveProject(project);
    //     res.send({ code: EnumErrorCode.OK });
    // }
    // catch (e) {
    //     res.send({ code: EnumErrorCode.Invite_Create_Fail });
    // }


});

RouterInvite.post("/invite/delete", async (req, res) => {

    const cs:CS_DeleteInvite = req.body;
    const user: User = req.body._user;

    const project: Project = _.find(user.projects, { id: cs.projectid });

    if (!project) {
        res.send({ code: EnumErrorCode.Project_Not_Exist });
        return;
    }
    const invite:Invite = _.find(project.invites, { id: cs.inviteid });

    if (!invite) {
        res.send({ code: EnumErrorCode.Invite_Not_Exist });
        return;
    }
    try{
        _.remove(project.invites, invite);
        await DBManager.inst.saveProject(project);

    }
    catch(e){
        res.send({ code: EnumErrorCode.Invite_Delete_Fail });
        return;
    }
    

});

RouterInvite.post("/invite/list", async (req, res) => {   
    const cs:CS_GetInviteList = req.body;
    const user: User = req.body._user;
    
}
);

export default RouterInvite;