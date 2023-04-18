interface IEvent {
    selector: string;
    event: string;
    callback: (...args: any[]) => void
}

class Events {
    private eventRegistry: IEvent[]
    constructor(){
        this.eventRegistry = []
    }

    add(selector:string,event: string,callback:(...args: any[]) => void){
        this.eventRegistry.push({selector,event,callback});
    }

    getRegistry(){
        return this.eventRegistry
    }


}
const events = new Events();
export default events