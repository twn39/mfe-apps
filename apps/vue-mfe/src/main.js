import {createApp} from "vue";
import App from "./App";

const mount = (el) => {
    const app = createApp(App);
    app.mount(el);
}

export {mount}