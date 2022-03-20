import {html, render} from "lit";
import './App';

const mount = (el: HTMLElement) => {
  const app = () => html`<lit-app></lit-app>`;
  render(app(), el);
}

export {mount};
