import { Dialog } from "utilities/Dialog/dialog";
class Injector{
    constructor(){
        this.objects=[];
    }
    addObject(obj,name){
        let o={};
        o.name=name;
        o.obj=obj;
        this.objects.push(o);
        return obj;
    }
    getObject(name){
       let arr = this.objects.filter((e)=>{
            if(e.name===name){
                return true;
            }else{
                return false;
            }
        });
        if(arr.length>0){
            return arr[0].obj;
        }else{
           return this.createObject(name);
        }
    }
    get(name){
        return this.getObject(name);
    }
    createObject(name){
        switch(name){
            case "dialog":
               return  this.addObject(new Dialog(),"dialog");
                break;
            default:
                console.log("no widget found to instantiate");
                break;
        }
    }
}

export {Injector}