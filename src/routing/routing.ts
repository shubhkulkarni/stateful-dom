import Lib from "../core/library";
import { IComponentProps, IRoute, TComponentFunction, } from "../types/types";

class Router {
    private routing: IRoute[] = []
    private currentAppRoot: TComponentFunction | undefined | null
    constructor() {

    }

    get routes() {
        return this.routing
    }

    render(routes: IRoute[] | TComponentFunction) {
        if (!this.routing.length) {
            if (!(routes instanceof Array)) routes = [{ path: "/", root: routes }]
            this.routing = routes
            const element = document.querySelector<HTMLDivElement>('#app')
            if(!element){
                const body = document.querySelector('body')
                const app = document.createElement('div')
                app.setAttribute('id','app')
                body?.appendChild(app)
            }
            Lib.renderApp()
            Lib.runPreLoads();
        }
    }

    get currentRoot() {
        return this.currentAppRoot
    }

    navigate(path: string) {
        history.pushState(undefined, "", path)
        Lib.refreshView()
        console.log('rendered from navigate')
    }

    resolveCurrentRoute() {
        const currentPath = window.location.pathname
        const allPaths = this.routing.map(i => i.path)
        let currentRoute: IRoute | undefined;
        if(!allPaths.includes(currentPath)){
            currentRoute = this.routing.find(i => i.path === "*")
        }else{
            currentRoute = this.routing.find(i => i.path === currentPath)
            if(currentRoute?.redirectTo){
                history.pushState({},"",currentRoute?.redirectTo as string);
                currentRoute = this.routing.find(i => i.path === currentRoute?.redirectTo);
            }
        }
        
        this.currentAppRoot = currentRoute?.root || null
    }

    link(content: string, attributes: IComponentProps) { //todo
        return `<a ${Lib.spreadAttributes(attributes, ['href'])}> ${content} </a>`
    }

}
const router = new Router()
export default router