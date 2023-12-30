import { MsgBasic } from "../../common/protocols/MsgBasic";

export class CS_BuyItem extends  MsgBasic{

    public item_id:number = 0;

    public count:number = 0;
}


export class SC_BuyItem extends MsgBasic{
    
}