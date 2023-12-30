
import express from 'express'
import { DBManager } from '../manager/DBManager';
import { User } from '../entity/User';
import { CS_UpdateUserInfo, SC_UpdateUserInfo } from '../protocols/Proto_UpdateUserInfo';
import { CS_Logout } from '../protocols/Proto_Logout';
import { CS_Login, SC_Login } from '../protocols/Proto_Login';
import { EnumErrorCode } from '../../common/enum/EnumErrorCode';
import { Tools } from '../../common/utils/Tools';

export const UserRouter = express.Router();
UserRouter.post("/user/login", async (req, res) => {
    const data: CS_Login = req.body;
    
    const sc: SC_Login = new SC_Login();

    try{
        const user: User = await DBManager.inst.findUser({ email: data.email });

        if (!user) {
            sc.tip(EnumErrorCode.Account_Exist);
            res.send(sc);
            return;
        }
    
        // 检查密码是否正确
        if (user.password != data.password) {
            sc.tip(EnumErrorCode.Password_Error);
            res.send(sc);
            return;
        }
        user.last_login_ip = req.ip;
        user.last_login_time = Tools.getServerDate();
        sc.userid = user.id;
        sc.name = user.nickname;
        sc.session = await DBManager.inst.updateUserSession(user);
        res.send(sc);
    
    }
    catch(err){
        sc.tip(EnumErrorCode.Login_fail);
        console.log(err);
        res.send(sc);
    }

});

UserRouter.post("/user/update", async (req, res) => {
    const data: CS_UpdateUserInfo = req.body;
    const user: User = req.body._user;
    user.nickname = data.nickname;
    user.province = data.province;
    user.city = data.city;

    try {
        await DBManager.inst.saveUser(user);

        res.send({ code: EnumErrorCode.OK });
    }
    catch (e) {

        res.send({ code: EnumErrorCode.Update_UserInfo_Fail });
    }

});
UserRouter.post("/user/logout", async (req, res) => {
    const data: CS_Logout = req.body;
    const user: User = req.body._user;

    try {
        DBManager.inst.logout(user);
        res.send({ code: EnumErrorCode.OK });
    }
    catch (e) {
        res.send({ code: EnumErrorCode.Logout_Fail });
    }

});


export default UserRouter;