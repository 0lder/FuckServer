export enum EnumErrorCode {
    OK = 0,


    ServiceRegisted = 1001,//**服务已注册 */
    ServiceRegisterFailed = 1002,//**服务注册失败 */
    ServiceNotFoundHandler = 1003,//**当前服务没有找到处理方法 */
    ServiceOrderTimeOut = 1004,//**服务订单处理超时 */
    ServiceNotFound = 1005,
    Email_Error,
    Password_Error,
    Phone_Error,
    Account_Exist,
    Create_User_Fail,
    Login_fail,
    Update_UserInfo_Fail,
    Logout_Fail,
    Session_isInvalid,
    Router_not_Exist,
    ErrorParams,
    Project_Not_Exist,
    Invite_Not_Exist,
    Invite_Delete_Fail,
    Project_Create_Fail
}