import { CS_Register, SC_Register } from '../protocols/Proto_Register';
import { DBManager } from '../manager/DBManager';
import { User } from '../entity/User';
import { EnumErrorCode } from '../../common/enum/EnumErrorCode';
import { UserRouter } from './RouterUser';
import { Tools } from '../../common/utils/Tools';
UserRouter.post("/user/register", async (req, res) => {
    //获取post数据
    console.log(req.body);
    const data: CS_Register = req.body;

    const sc: SC_Register = new SC_Register();


    //检查req.body 是否包含SC_Register的所有属性
    if (!Tools.verifyEmail(data.email)) {
        sc.tip(EnumErrorCode.Email_Error);
        res.send(sc);
        return;
    }

    if (!Tools.verifyPassword(data.password)) {
        sc.tip(EnumErrorCode.Password_Error);
        res.send(sc);
        return;
    }
    if (!Tools.verifyPhone(data.phone.toString())) {
        sc.tip(EnumErrorCode.Phone_Error);
        res.send(sc);
        return;
    }

    // 查找用户是否已经存在
    const user: User = await DBManager.inst.findUser({ email: data.email });

    if (user) {
        sc.tip(EnumErrorCode.Account_Exist);
        res.send(sc);
        return;
    }

    // 创建用户
    const newUser: User = new User();
    newUser.email = data.email;
    newUser.password = data.password;
    newUser.phone = data.phone;
    newUser.register_ip = req.ip;

    const saveUser: User = await DBManager.inst.saveUser(newUser);

    if (saveUser) {
        sc.code = EnumErrorCode.OK;
        sc.userid = saveUser.id;
    }
    else {
        sc.code = EnumErrorCode.Create_User_Fail;
    }

    res.send(sc);
});
