# Stateful DOM
## Introduction
A tiny stateful & reactive DOM wrapper library to build vanilla JavaScript or TypeScript front-end applications using modern component based patterns.
Try in [CodeSandbox](https://codesandbox.io/p/sandbox/frosty-glitter-6fzugw)
## Installation
```npm
npm i stateful-dom
```
## Usage
 - Create a vanilla js/ts  project. We recomment using [Vite](https://vitejs.dev/guide/)
 - Install `stateful-dom` package using command `npm i stateful-dom`
 - import router object from the package
 - `router.render()` is the entry point of the application
 - Refer package API for more detailed usage
#### Creating app in `index.js` (with single route)
 ```javascript
import {Lib,router} from 'stateful-dom';

const app = () => {
	const template = `<div> App is working </div>`;
	return Lib.createComponent(template);
}
router.render(app);
  ```
#### Creating app in `index.js` (with multiple routes)
 ```javascript
import {Lib,router} from 'stateful-dom';

const page1 = () => {
	const template = `<div> Page1 is working </div>`;
	return Lib.createComponent(template);
}
const page2 = () => {
	const template = `<div> Page2 is working </div>`;
	return Lib.createComponent(template);
}

const page3 = () => {
  const template = `<div> Page3 is working </div>`;
  return Lib.createComponent(template);
}

const notFound = () => {
  const template = `<div> 404 ! route not found </div>`;
  return Lib.createComponent(template);
}

const app = [
	{path:"/",root: page1},
	//page 2 will be redirected to page3 , for this use 'redirectTo' option like below
	{path:"/page2",root: page2, redirectTo: "/page3"},
  	{path:"/page3",root: page3},
  	{path:"*",root:notFound} // for handling routes that don't exist, add path as "*"
]

router.render(app);
  ```
#### Creating a component
 ```javascript
import {Lib} from 'stateful-dom';

export const myButton = (label) => {
	const template = `<button id='my-btn'> ${label} </button>`;
	return Lib.createComponent(template);
}
  ```
#### Club multiple components to form single component
 ```javascript
import {Lib} from 'stateful-dom';

export const myButton = (label) => {
	const template = `<button id='my-btn'> ${label} </button>`;
	return Lib.createComponent(template);
}
export const display = (text) => {
	const template = `<div> ${text} </text>`;
	return Lib.createComponent(template);
}

export const buttonWithDisplay = () => {
	return Lib.clubComponents(
		[
			display("click this") , // this array of componets will be rendered in exact order
			myButton("add"), 
			myButton("substract")
		])
}

  ```
#### Handle event listeners
 ```javascript
import {Lib,events} from 'stateful-dom';

//make sure you DON'T add events inside component function (myButton()) 
events.add('#my-btn','click',() => { 
	console.log("myButton is clicked");
});

export const myButton = (label) => {
	const template = `<button id='my-btn'> ${label} </button>`;
	return Lib.createComponent(template);
}
  ```
#### Add DOM attributes to a component 
 ```javascript
import {Lib,events} from 'stateful-dom';

//props is an object!
//Lib.spreadAttributes(props) can be used to add - 
//attributes in props object to any dom node

export const myButton = (label,props) => {
	const template = `<button ${Lib.spreadAttributes(props)} id='my-btn'> ${label} </button>`;
	return Lib.createComponent(template);
}
  ```
#### Render list with adding events
 ```javascript
import {Lib,events} from 'stateful-dom';
import {myComponent} from "./myComponent";

const list = ["Banana","Apple","Kiwi"].map(item=>{
	return myComponent(item);
});

export const fruitsListComponent = () => {
	return Lib.createListNode(list);
}
  ```
#### Conditional rendering
 ```javascript
import {myButton} from "./myButton";

export const myComponent = (loading) => {

	const template = `<div> ${loading ? 'Loading...' : myButton("Click").innerHTML} </div>`;
	
	return Lib.createComponent(template);
}
  ```
####  Compose component templates
 ```javascript
import {myButton} from "./myButton";
import {display} from "./display";

export const myComponent = () => {
	const template = `<div> 
		${myButton("Click").innerHTML}
		${display("Some text").innerHTML} 
</div>`;
	return Lib.createComponent(template);
}
  ```
#### Navigate to a route
 ```javascript
import {Lib,events,router} from 'stateful-dom';

//make sure you DON'T add events inside component function (myButton()) 
events.add('#my-btn','click',() => { 
	router.navigate("/home"); //navigate method doesn't reload the page
});

export const myButton = (label) => {
	const template = `<button id='my-btn'> ${label} </button>`;
	return Lib.createComponent(template);
}
  ```
#### Handle form data
 ```javascript
import  {  Lib,  events  }  from  "../../lib"
import  {  $  }  from  "../../main" //global state exported from main file
import  './cart.css'

events.add('.checkout-btn','click',  ()  =>  {
	const  name  =  Lib.getFormItem('#checkout-name').value //get input value
	const  address  =  Lib.getFormItem('#checkout-address').value
	$.setState('userData',{name,address,cartItems:  $.state.cart}) //update state
})

export  const  cart  =  ()  =>  {
	const  template  =  `
		<form>
			<input  type='text'  id='checkout-name'  placeholder='your name'/>
			<input  type='text'  id='checkout-address'  placeholder='Address'/>
			<button  type='button'  class='checkout-btn'>Checkout and Pay</button>
		</form>
	`
	const element = Lib.createComponent(template)
	return Lib.clubComponents([element],{class:'cart-checkout'})
}
  ```
## State
The state of the application or component can be managed using the `State` class. We can create object of `State` class providing some initial state of the application. On the state object we get `state` variable to access the state and a setter function called `setState` , which expects the `key` and `value` parameters of state variable that needs to be updated.
On the `setState` call , the state is updated and the **The entire current route UI is re-rendered!**
`setState` calls are expected mostly in event handlers. Avoid setting state in **component functions** as it may cause **infinite render loop!** 
```javascript
import {State} from 'stateful-dom';

export const _ = new State({user: "" }) // this state can be imported into any file of app
console.log(_.state.user)
```
## API
### Lib
|Method|Parameters|Remarks|
|----------|-------|-------|
|createComponent()|template:  string, name?:string| name is the parent node ex. 'div'
|clubComponents()|components:(Element or null)[], attributes?: object,parent?:string  | used to club multiple components to form a single component. the order of 'components' array is maintained in the dom|
|createListNode()| list: (Element  or null)[], parent:  string  =  'div'| creates a single list node from array of Elements (Nodes)|
|spreadAttributes() | attributes?:  IComponentProps,omits:  string[] = [] | the names of attributes in 'omits' array will be ignored|
|getFormItem()| selector: string | returns HTMLFormElement to handle form input values etc.|
### Events
|Method|Parameters|Remarks|
|------|--|--|
|add()| selector:string,event:string, callback:(...args:  any[])  =>  void | to handle broweser events. 'selector' should be valid html selector ex. '#app2', '.class2'|
### State
|Method|Parameters|Remarks|
|------|--|--|
|state| Not a method| used to access the state
|setState()|key:  string,  value:  any | used to update state|
|new State()|initialState?:  {[key:  string]:  any},logger?:  string| 'logger' is a string name to log state object to console|
## Known issues
 - When **any** state is updated, the **entire UI of current route** is re-rendered. This is bit performance heavy.
 - Each time the dom is re-rendered , we need to add all the registered event listeners again :( 
## ToDos
 - Child routing
 - link() component development
 - handling changes/effects
 - Solve event handling issues

