import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Tools } from "../../common/utils/Tools";
@Entity()
export class Chat {

    @PrimaryGeneratedColumn()
    public id: number; //用户id

    @Column()
    public text: string;

    @Column("datetime")
    public time: string = Tools.getServerDate();
    
}