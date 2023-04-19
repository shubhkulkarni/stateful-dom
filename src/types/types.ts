export interface IComponentProps {
    [key: string]: any
}

export type TComponentFunction = (...args: any[]) => Element | null

export interface IRoute{
    path: string;
    root: TComponentFunction;
    redirectTo?:string
}

export interface ILinkProps extends IComponentProps{
    href: string
}

export type UseStateTupleType = [ {[key: string]: any},(key: string, value: any) => void]