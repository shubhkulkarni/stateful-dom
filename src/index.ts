import events from "./events/events";
import Lib from "./core/library";
import useState from "./state/state";
import  {IComponentProps,TComponentFunction,IRoute}  from "./types/types";
import router from "./routing/routing";

const link = router.link;
const render = router.render;

if (!window)
  throw new Error("stateful-dom library works only on browser!");

export { events, Lib, useState,router,link,render};
export type { IComponentProps,TComponentFunction,IRoute };

