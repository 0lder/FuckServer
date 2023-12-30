import { Collection, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EnumJobType } from "../enum/EnumJobType";
import { EnumWorkState } from "../enum/EnumWorkState";
import { Project } from "./Project";
import { Tools } from "../../common/utils/Tools";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public id: number; //用户id

    @Column()
    public nickname: string = ""; //昵称


    @Column("datetime")
    public register_time:string = Tools.getServerDate(); //注册时间

    @Column()
    public phone:number = 0;//手机号

    @Column()
    public email:string = ""; //邮箱

    @Column()
    public password:string = ""; //密码


    @Column()
    public province:string = ""; //省份

    @Column()
    public city:string = ""; //城市
    

    @Column()
    public session:string = ""; //登录session

    @Column()
    public register_ip:string = ""; //注册ip

    @Column()
    public last_login_ip:string = ""; //最后登录ip

    @Column("datetime")
    public last_login_time:string = Tools.getServerDate() //最后登录ip

    @Column()
    public job:EnumJobType = EnumJobType.Other; //职业

    @Column()
    public state:EnumWorkState = EnumWorkState.WORKING; //工作状态


    @OneToMany(() => Project, (photo) => photo.user)
    projects: Project[]; // 一个用户有多个项目

    @Column()
    public level:number = 1; //用户等级

    @Column()
    public exp:number = 0; //用户经验
}