
import { CS_CreateProject } from "../protocols/Proto_CreateProject";
import { CS_Login } from "../protocols/Proto_Login";
import { CS_Register } from "../protocols/Proto_Register";
import { CS_UpdateUserInfo } from "../protocols/Proto_UpdateUserInfo";

const ConstRequestBodyConfig:{[key:string]:any} = {}

ConstRequestBodyConfig["/user/login"] = CS_Login;
ConstRequestBodyConfig["/user/register"] = CS_Register;
ConstRequestBodyConfig["/user/update"] = CS_UpdateUserInfo;
ConstRequestBodyConfig["/user/logout"] = CS_CreateProject;
export default ConstRequestBodyConfig;