import {render, h} from "preact";
import App from "./App";

const mount = (el: HTMLElement) => {
    render(h(App, {}), el);
}

export {mount}