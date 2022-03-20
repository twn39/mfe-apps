import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import logoImg from '../assets/images/lit.png';

@customElement('lit-app')
class App extends LitElement {
  static styles = css`
      p {
        color: green;
        margin: 0;
      }
    `;
  render(){
    return html`<div>
      <p>Lit Mfe.</p>
      <img width="300" src=${logoImg} alt="">
    </div>`;
  }
}
