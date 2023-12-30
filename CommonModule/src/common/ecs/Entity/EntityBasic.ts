import _ from "lodash";
import { ComponentBasic } from "../Component/ComponentBasic";
import { Tools } from "../../utils/Tools";

export class EntiyBasic {
    public uid: string = Tools.getUID();
    
    private _components: ComponentBasic[] = [];


    /**
     * 增加组件
     *
     * @param {*} component
     * @memberof EntiyBasic
     */
    public addComponent<T extends ComponentBasic>(component: T): T {
        
        component.bindEntity(this);
        this._components.push(component);
        component.onStart();
        return component;
    }

    /**
     * 判断是否有组件
     *
     * @param {*} componentType
     * @return {*}  {boolean}
     * @memberof EntiyBasic
     */
    public hasComponent(componentType: any): boolean {
        return this._components.some(component => component instanceof componentType);
    }

    /**
     * 移除组件
     *
     * @param {*} componentType
     * @memberof EntiyBasic
     */
    public removeComponent(componentType: any): void {
        _.forEach(this._components, (comp, index: number) => {
            if (comp instanceof componentType) {
                comp.onDestroy();
                this._components.splice(index, 1);
            }
        });
    }


    public getComponent(componentType: any): any {
        return _.find(this._components, comp => {
            return comp instanceof componentType;
        });
    }


    public getAllComponents():ComponentBasic[]{
        return this._components;
    }
}