interface IEvent {
    selector: string;
    event: string;
    callback: (...args: any[]) => void
}

type TPreloadCallBack =  (...args: any[]) => void | Promise<void>;

class Events {
    private eventRegistry: IEvent[]
    private preLoadings: TPreloadCallBack[];
    constructor(){
        this.eventRegistry = [];
        this.preLoadings = [];
    }

    add(selector:string,event: string,callback:(...args: any[]) => void){
        this.eventRegistry.push({selector,event,callback});
    }

    preload(cb: TPreloadCallBack){
        this.preLoadings.push(cb);
    }

    getPreLoads() {
        return this.preLoadings;
    }

    getRegistry(){
        return this.eventRegistry
    }


}
const events = new Events();
export default events