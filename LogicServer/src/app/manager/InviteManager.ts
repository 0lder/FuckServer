import { Invite } from "../entity/Invite";
import { User } from "../entity/User";

export class InviteManager {
    private static _instance: InviteManager = null;

    private _allInvites: { [key: string]: Invite } = {};

    public static get inst(): InviteManager {
        if (this._instance === null) {
            this._instance = new InviteManager();
        }
        return this._instance;
    }


    // 按省份 城市推荐排序查找invite
    public getInvitesByProvinceAndCity(province: string, city: string): Invite[] {
        let invites: Invite[] = [];
        for (let key in this._allInvites) {
            let invite = this._allInvites[key];
            if (invite.province == province && invite.city == city) {
                invites.push(invite);
            }
        }
        //将_allinVites 排序 优先级按照  城市 省份 职业 项目类型 从高到低排序
        invites.sort((a: Invite, b: Invite) => {
            if (a.city == city && b.city != city) {
                return -1;
            }
            else if (a.city != city && b.city == city) {
                return 1;
            }
            else if (a.province == province && b.province != province) {
                return -1;
            }
            else if (a.province != province && b.province == province) {
                return 1;
            }

            else {
                return 1;
            }
        });
        return invites;
    }
}