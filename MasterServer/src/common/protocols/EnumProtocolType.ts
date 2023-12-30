export enum EnumProtocolType {  

    Unknow = -1,

    SC_SystemError = 100, // 系统错误


    //**1开头都是内部协议 */
    CS_SyncServiceList = 1001,
    SC_SyncServiceList = 2001,


    CS_RegisterService = 1002,
    SC_RegisterService = 2002,


    CS_SendMasterHeartBeat = 1004,
    SC_SendMasterHeartBeat = 2004,

    //**2开头为外部协议 */
    CS_Login  = 1004,
    SC_Login = 2004,

    CS_SendHeartBeat = 1005,
    SC_SendHeartBeat = 2005




}