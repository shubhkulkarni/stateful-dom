import Lib from "../core/library";
import { UseStateTupleType } from "../types/types";


class State {
    private store
    private logger: string | undefined
    constructor(initial?: {[key: string]: any},logger?: string) {
        this.store = initial || {}
        this.logger = logger
    }

    get state() {
        return this.store
    }

    set state(_value: any){
        throw new Error("State mutation is not allowed. use 'setState' function to update the state");
    }
    
    setState(key: string, value: any) {

        let toRender = false;
        
        if (this.store[key] !== value) toRender =  true;

        this.store = { ...this.store, [key]: value }
        
        if(toRender) {
            Lib.renderApp()
        }

        if(this.logger && this.logger?.trim()){
            console.log(this.logger,this.state)
        }
        
    }

}
//todo : needs mutation of store for 'state' to work properly
export const useState = (initial?: {[key: string]: any},logger?: string) => {
    const _ = new State(initial,logger);
    const state = _.state;
    const setState = _.setState.bind(_);
    return [state,setState] as UseStateTupleType;
}

export default State