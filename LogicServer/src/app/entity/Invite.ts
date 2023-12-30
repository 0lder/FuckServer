import { Collection, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EnumJobType } from "../enum/EnumJobType";
import { EnumWorkState } from "../enum/EnumWorkState";
import { Project } from "./Project";
import { Tools } from "../../common/utils/Tools";

@Entity()
export class Invite {

    @PrimaryGeneratedColumn()
    public id: number;


    @Column()
    public title: string = "";


    @Column()
    public desc: string = "";

    @Column()
    public mode: string = "";

    @Column()
    public job_type: EnumJobType = EnumJobType.Other; //职业


    @Column()
    public province: string = ""; //省份

    @Column()
    public city: string = ""; //城市


    @Column()
    public work_state: EnumWorkState = EnumWorkState.FREELANCE; //工作状态

    @Column()
    public pay: string = "";

    @Column()
    public count:number = 0; //招聘人数

    @Column("datetime")
    public createtime:string = Tools.getServerDate() //创建时间

    @ManyToOne(() => Project, (project) => project.invites)
    project: Project; // 一个用户有多个项目

    @Column()
    projectid:number;

}