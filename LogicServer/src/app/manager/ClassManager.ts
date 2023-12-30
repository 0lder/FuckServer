import ConstRequestBodyConfig from "../router/RequestBodyConfig";

export class ClassManager{
    private static _instance:ClassManager;

    private _classMap:Map<string,any> = new Map<string,any>();

    public static  getInstance():ClassManager{
        if(this._instance === null){
            this._instance = new ClassManager();
        }
        return this._instance;
    }

    constructor(){
        for (const key in ConstRequestBodyConfig) {
            if (Object.prototype.hasOwnProperty.call(ConstRequestBodyConfig, key)) {
                const model:any = ConstRequestBodyConfig[key];
                this._classMap[key] = new model();
            }
        }
    }
    public verifyObject(object:any,classModel:any):boolean{
        //修改代码让它返回boolean值
        // 遍历这个类的所有属性

        if(!object){
            return false;
        }
        // 获取一个class的类名
        if(!this._classMap[classModel.name]){
            return false;
        } 

        // 遍历这个类的所有属性
        for(const key in this._classMap[classModel.name]){
            // 如果这个属性是一个对象
            if(typeof this._classMap[classModel.name][key] === "object"){
                // 如果这个属性是一个数组
                if(Array.isArray(this._classMap[classModel.name][key])){
                    // 遍历这个数组
                    for(const item of this._classMap[classModel.name][key]){
                        // 如果这个数组的元素是一个对象
                        if(typeof item === "object"){
                            // 递归验证这个对象
                            const ret:boolean = this.verifyObject(item,item.constructor);
                            if(!ret){
                                return false;
                            }
                        }
                    }
                }else{
                    // 如果这个属性是一个对象
                    if(typeof this._classMap[classModel.name][key] === "object"){
                        // 递归验证这个对象
                        const ret:boolean = this.verifyObject(this._classMap[classModel.name][key],this._classMap[classModel.name][key].constructor);
                        
                        if(!ret){
                            return false;
                        }
                    }
                }
            }else{
                // 如果这个属性是一个基本类型
                if(typeof this._classMap[classModel.name][key] !== typeof object[key]){
                    return false;
                }
            }
        }

        return true;

    }
}