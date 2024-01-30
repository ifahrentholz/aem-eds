const e=document.createElement("template");e.innerHTML=`
  <style>
    :host {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
    }

    button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: indianred;
        color: #333;
        cursor: pointer;
        transition: border-color 0.25s;
        width: 100%;
      }

      button:hover {
        background-color: #1a1a1a;
        color: #f9f9f9;
      }

  </style>

  <h3>Native Counter</h3>
  <button id="btn">count is <span id="count"></span></button>`;class o extends HTMLElement{constructor(){super(),this.count=0,this.count=0,this.attachShadow({mode:"open"})}connectedCallback(){this.shadowRoot.appendChild(e.content.cloneNode(!0)),this.shadowRoot.getElementById("btn").onclick=()=>this.inc(),this.update(this.count)}inc(){this.update(++this.count)}update(n){this.shadowRoot.getElementById("count").innerHTML=n.toString()}}customElements.define("native-counter",o);function i(t){const n=t.innerHTML;t.innerHTML=`<native-counter>${n}</native-counter>`}export{i as default};
//# sourceMappingURL=native-counter.js.map
