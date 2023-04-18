import events from "../events/events"
import  { IComponentProps } from "../types/types"
import router from "../routing/routing"

class Lib {

    static clubComponents(parent: string,components: (Element | null)[],attributes?: IComponentProps){
        const root = document.createElement(parent)
        if(attributes){
            Object.entries(attributes).forEach(i => {
                root.setAttribute(i[0],i[1])
            })
        }
        components.forEach(c => {
            if(c) root.appendChild(c)
        })
        return root
    }

    static refreshView(){
        router.resolveCurrentRoute()
        Lib.renderApp()
    }

    static renderApp() {
       
        if(!router.currentRoot){
            router.resolveCurrentRoute();
        }

        let appRoot = router.currentRoot;
        if(!appRoot) return 
        const root = Lib.clubComponents('div',[appRoot()])
        const element = document.querySelector<HTMLDivElement>('#app')
        element!.innerHTML = root.innerHTML
        this.registerEventListeners()
    }

    static registerEventListeners(){
        events.getRegistry().forEach(e => {
            (document.querySelectorAll(e.selector) || []).forEach(i => {
                i.addEventListener(e.event,e.callback)
            })
        })
        window.addEventListener('popstate', function () {
            Lib.refreshView()
        });
    }

    static createComponent(template: string,name?:string){
        const element = document.createElement(name || 'div');
        element.innerHTML = template;
        return element;
    }

    static createListNode (list: (Element | null)[],parent: string = 'div'){
        const element = document.createElement(parent || 'div')
        list.forEach(i => {
            if(i) element.appendChild(i)
        })
        return element
    }

    static spreadAttributes(attributes?: IComponentProps,omits: string[] = []){
        if(!attributes) return ''
        let atrStr = ""
        
        Object.entries(attributes).forEach(i=>{
            if(!omits.includes(i[0])){
                const exp = typeof(i[1]) === 'string' ? ` ${i[0]}="${i[1]}" ` : ` ${i[0]}=${i[1]} `;
                atrStr = atrStr + " " + exp 
            }
        })
        return atrStr
    }

    static getFormItem (selector: string){
        return document.querySelector(selector) as HTMLFormElement
    } 
    
}

export default Lib