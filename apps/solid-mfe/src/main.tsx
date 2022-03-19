import {render} from "solid-js/web";
import App from "./App";

const mount = (el: HTMLElement) => {
    render(() => <App />, el)
}

export {mount}