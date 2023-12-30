
import { Tools } from "../../utils/Tools";
import { EntiyBasic } from "../Entity/EntityBasic";

export class ComponentBasic {

    public name: string = "";


    /**
     * 组件id
     *
     * @type {string}
     * @memberof ComponentBasic
     */
    public id: string = Tools.getUID();

    public entity: EntiyBasic;


    private _isEnabled: boolean = true;


    private _isDoing: boolean = false;



    constructor(name?: string) {

    }


    public bindEntity(entity: EntiyBasic): void {
        this.entity = entity;
    }


    public setEnabled(flag: boolean): void {
        this._isEnabled = flag;
    }

    public invoke(): void {
        if (!this._isEnabled) {
            return;
        }

        if (!this.entity) {
            return;
        }


        if (this._isDoing) {
            //**正在执行不能重复执行 */
            return;
        }
        this._isDoing = true;

        this.do();

    }


    /**
     * 实例需要重写这个函数
     *
     * @memberof ComponentBasic
     */
    public do(): void {

    }

    /**
     * 在完成的时候需要调用这个方法 表示已结束
     *
     * @memberof ComponentBasic
     */
    public done(): void {
        this._isDoing = false;
    }


    /**
     * 生命周期函数 组件初始化的时候调用
     *
     * @memberof ComponentBasic
     */
    public onStart(): void {

    }

    /**
     * 组件被激活的时候调用
     *
     * @memberof ComponentBasic
     */
    public onEnabled(): void {

    }


    /**
     * 组件被禁用的时候调用
     *
     * @memberof ComponentBasic
     */
    public onDisabled(): void {

    }


    /**
     * 组件被暂停的时候调用
     *
     * @memberof ComponentBasic
     */
    public onPause(): void {


    }


    /**
     * 组件恢复的时候调用
     *
     * @memberof ComponentBasic
     */
    public onResume(): void {

    }


    /**
     * 组件被摧毁的时候调用
     *
     * @memberof ComponentBasic
     */
    public onDestroy(): void {


    }


    /**
     * 更新函数
     *
     * @param {number} dt
     * @memberof ComponentBasic
     */
    public update(dt: number,servertime:number): void {

    }





}