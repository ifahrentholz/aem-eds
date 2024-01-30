const n=document.createElement("template");n.innerHTML=`
  <style>
    * {
      font-size: 200%;
    }

    span {
      width: 4rem;
      display: inline-block;
      text-align: center;
    }

    button {
      width: 4rem;
      height: 4rem;
      border: none;
      border-radius: 10px;
      background-color: seagreen;
      color: white;
    }
  </style>
  <button id="dec">-</button>
  <span id="count"></span>
  <button id="inc">+</button>`;class o extends HTMLElement{constructor(){super(),this.count=0,this.count=0,this.attachShadow({mode:"open"})}connectedCallback(){this.shadowRoot.appendChild(n.content.cloneNode(!0)),this.shadowRoot.getElementById("inc").onclick=()=>this.inc(),this.shadowRoot.getElementById("dec").onclick=()=>this.dec(),this.update(this.count)}inc(){this.update(++this.count)}dec(){this.update(--this.count)}update(e){this.shadowRoot.getElementById("count").innerHTML=e.toString()}}customElements.define("native-counter",o);function i(t){const e=t.innerHTML;t.innerHTML=`<native-counter>${e}</native-counter>`}export{i as default};
//# sourceMappingURL=native-counter.js.map
