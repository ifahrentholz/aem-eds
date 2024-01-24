import{i as l,n as f,s as d,x as u,t as h}from"../__compiled__chunks/property.7NwZovwM.js";var p=Object.defineProperty,b=Object.getOwnPropertyDescriptor,c=(a,t,i,r)=>{for(var o=r>1?void 0:r?b(t,i):t,n=a.length-1,s;n>=0;n--)(s=a[n])&&(o=(r?s(t,i,o):s(o))||o);return r&&o&&p(t,i,o),o};let e=class extends d{constructor(){super(...arguments),this.count=0}render(){return u`
      <slot></slot>
      <div class="card">
        <button @click=${this._onClick} part="button">count is ${this.count}</button>
      </div>
    `}_onClick(){this.count++}};e.styles=l`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.lit:hover {
      filter: drop-shadow(0 0 2em #325cffaa);
    }

    .card {
      padding: 2em;
    }

    .read-the-docs {
      color: #888;
    }

    ::slotted(h1) {
      font-size: 3.2em;
      line-height: 1.1;
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `;c([f({type:Number})],e.prototype,"count",2);e=c([h("diva-cards")],e);
//# sourceMappingURL=cards.js.map
