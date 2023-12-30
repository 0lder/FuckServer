import { DataSource, FindOptionsWhere, Repository } from "typeorm";
import { User } from "../entity/User";
import { Project } from "../entity/Project";
import { Invite } from "../entity/Invite";
import { Chat } from "../entity/Chat";
import { Tools } from "../../common/utils/Tools";


export class DBManager {



    private _isDBConnected: boolean = false; //** 是否db已经连接上了 */

    private _isRedisConnected: boolean = false; //**是否redis已经连接上了 */

    private static _instance: DBManager = null;

    private _appDataSource: DataSource = null;

    private _users: { [key: string]: User } = {};

    private _sessions: { [key: string]: { user: User, updatetime: number } } = {};
    public static get inst(): DBManager {
        if (this._instance === null) {
            this._instance = new DBManager();
        }
        return this._instance;
    }



    constructor() {

    }

    /**
     * 连接数据库
     *
     * @private
     * @memberof DBManager
     */
    private async connectDB(): Promise<void> {


        const appDataSource = new DataSource({
            type: "mysql",
            host: "",
            port: 5700,
            username: "",
            password: "",
            database: "gameindier",
            entities: [User,Project,Invite,Chat],
            debug:true
        });

        try {
            await appDataSource.initialize();
            console.log("mysql connect stated success");

        }
        catch (e) {
            console.log("连接失败:", e);
        }
        this._appDataSource = appDataSource;
    
    }

    /**
     * 连接redis
     *
     * @private
     * @memberof DBManager
     */
    private connectRedis(): void {

    }


    /**
     * 连接server
     *
     * @return {*}  {Promise<void>}
     * @memberof DBManager
     */
    public async connect(): Promise<void> {
        await this.connectDB();
    }


    //**查找用户 */
    public async findUser(param: FindOptionsWhere<User>): Promise<User> {

        const a: Repository<User> = this._appDataSource.getRepository(User);
        a.findOneBy(param)
        const b:User = await a.findOneBy(param);
        return await this._appDataSource.getRepository(User).findOneBy(param);
    }

    public async saveUser<User>(user: User): Promise<User> {

        return await this._appDataSource.getRepository(User).save(user);
    }

    // 发送post请求
    public async post(url: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(xhr.responseText);
                    }
                }
            };
        });
    }


    public async updateUserSession(user: User): Promise<string> {
        user.session = Tools.getUID();
        await this._appDataSource.getRepository(User).save(user);
        this._users[user.id] = user;
        this._sessions[user.session] = { user: user, updatetime: Tools.getServerTime() };


        // 检查所有sessions 是否与 user的session相同 不一致则从_sessions中删除

        return user.session;
    }

    public verifySession(session: string): boolean {
        return this._sessions[session] != null;
    }


    /**
     * 通过session获取用户
     *
     * @param {*} session
     * @return {*}  {User}
     * @memberof DBManager
     */
    public getUserBySession(session: any): { user: User, updatetime: number } {

        return this._sessions[session];
    }

    public saveProject(project: Project): Promise<Project> {

        return this._appDataSource.getRepository(Project).save(project);
    }

    /**
     * 登出
     *
     * @param {User} user
     * @return {*}  {Promise<void>}
     * @memberof DBManager
     */
    public async logout(user: User): Promise<void> {
        user.session = "";
        await this._appDataSource.getRepository(User).save(user);
    }


    public async saveInvite(invite: Invite) {

        await this._appDataSource.getRepository(Invite).save(invite);
    }


    public verifyUserSession(session: string): boolean {

        if (!session) {
            return false;
        }
        const data = this._sessions[session];

        if (!data) {
            return false;
        }

        if (data.updatetime + 60 * 10 < Tools.getServerTime()) {
            return false;
        }

        return true;
    }

    //**更新session 过期时间 */
    public updateSession(session: string): void {
        const data = this._sessions[session];
        if (data) {
            data.updatetime = Tools.getServerTime();
        }
    }
}