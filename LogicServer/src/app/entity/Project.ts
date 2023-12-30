import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EnumProjectState } from "../enum/EnumProjectState";
import { EnumProjectType } from "../enum/EnumProjectType";
import { EnumJobType } from "../enum/EnumJobType";
import { User } from "./User";
import { Invite } from "./Invite";

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    public id: number; //用户id


    @Column()
    public name:string; //项目名称

    @Column()
    public desc:string; //项目描述

    @Column()
    public createtime:number; //创建时间

    @Column()
    public ownerid:number; //创建者id

    @Column()
    public state:EnumProjectState = EnumProjectState.Developing; //项目状态

    @Column()
    public type:EnumProjectType = EnumProjectType.Other; //项目类型

    @Column("json")
    public members:{type:EnumJobType,count:number}[] = []; //成员列表


    @ManyToOne(() => User, (user) => user.projects)
    user: User; // 一个用户有多个项目
    

    @OneToMany(() => Invite, (invite) => invite.project)
    invites: Invite[]; // 一个用户有多个项目

}