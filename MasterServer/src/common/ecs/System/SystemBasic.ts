import _, { entries } from "lodash";
import { EntiyBasic } from "../Entity/EntityBasic";
import { ComponentBasic } from "../Component/ComponentBasic";

export class SystemBasic {




    /**
     *  该系统能处理的组件列表
     *
     * @private
     * @type {any[]}
     * @memberof SystemBasic
     */
    private _componentTypes: any[] = [];

    public update(entitys: EntiyBasic[]): void {
        _.forEach(entitys, entity => {
            this._processEnity(entity);
        });
    }


    public addComponentType(componentType: any): void {
        this._componentTypes.push(componentType);
    }

    private _processEnity(entity: EntiyBasic): void {
        _.forEach(this._componentTypes, componentType => {

            if (entity.hasComponent(componentType)) {
                //**有该组件则要执行该组件对应的逻辑 */
                const comp: ComponentBasic = entity.getComponent(componentType);
                comp.invoke();
            }
        });
    }
}