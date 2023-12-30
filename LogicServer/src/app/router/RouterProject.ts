import express from "express";
import _ from "lodash";
import { Project } from "../entity/Project";
import { User } from "../entity/User";
import { DBManager } from "../manager/DBManager";
import { CS_CreateProject, SC_CreateProject } from "../protocols/Proto_CreateProject";
import { CS_DeleteProject } from "../protocols/Proto_DeleteProject";
import { CS_EditProject } from "../protocols/Proto_EditProject";
import { EnumErrorCode } from "../../common/enum/EnumErrorCode";
import { Tools } from "../../common/utils/Tools";


const ProjectRouter = express.Router();


ProjectRouter.post("/project/create", async (req, res) => {

    const cs: CS_CreateProject = req.body;

    const user: User = req.body._user;

    const sc: SC_CreateProject = new SC_CreateProject();
    // if (user.projects.length >= 10) {
    //     sc.code = EnumErrorCode.Project_Max;
    //     res.send(sc);
    //     return;
    // }

    const project: Project = new Project();
    project.name = cs.name;
    project.desc = cs.desc;
    project.members = cs.members;
    project.ownerid = user.id;
    project.type = cs.type;
    project.state = cs.state;
    project.user = user;
    project.createtime = Tools.getServerTime();

    user.projects.push(project);

    try {
        await DBManager.inst.saveProject(project);
        await DBManager.inst.saveUser(user);
        sc.code = EnumErrorCode.OK;
        sc.project = project;
        res.send(sc);
    }
    catch (e) {
        sc.code = EnumErrorCode.Project_Create_Fail;
        res.send(sc);
    }

});

ProjectRouter.post("/project/edit", async (req, res) => {

    const cs: CS_EditProject = req.body;
    const user: User = req.body._user;

    const project: Project = _.find(user.projects, { id: cs.projectid });
    if (project == null) {
        res.send({ code: EnumErrorCode.Project_Not_Exist });
        return;
    }

    project.name = cs.name;
    project.desc = cs.desc;
    project.members = cs.members;
    project.type = cs.type;
    project.state = cs.state;

    try {
        await DBManager.inst.saveProject(project);
        res.send({ code: EnumErrorCode.OK });
    }
    catch (e) {
        res.send({ code: EnumErrorCode.Project_Create_Fail });
    }
});

ProjectRouter.post("/project/delete", async (req, res) => {
    const cs: CS_DeleteProject = req.body;
    const user: User = req.body._user;
    const project: Project = _.find(user.projects, { id: cs.projectid });
    if (project == null) {
        res.send({ code: EnumErrorCode.Project_Not_Exist });
        return;
    }

    try {
        _.remove(user.projects, { id: cs.projectid });
        await DBManager.inst.saveUser(user);
        res.send({ code: EnumErrorCode.OK });
    }
    catch (e) {
        res.send({ code: EnumErrorCode.Project_Create_Fail });
    }
});

export default ProjectRouter;