const template = document.createElement('template');
template.innerHTML = `
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
  <button id="inc">+</button>`;

class NativeCounter extends HTMLElement {
  private count = 0;
  constructor() {
    super();
    this.count = 0;
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
    this.shadowRoot!.getElementById('inc')!.onclick = () => this.inc();
    this.shadowRoot!.getElementById('dec')!.onclick = () => this.dec();
    this.update(this.count);
  }

  inc() {
    this.update(++this.count);
  }

  dec() {
    this.update(--this.count);
  }

  update(count: number) {
    this.shadowRoot!.getElementById('count')!.innerHTML = count.toString();
  }
}

customElements.define('native-counter', NativeCounter);

export default function (block: HTMLElement) {
  const org_content = block.innerHTML;
  block.innerHTML = `<native-counter>${org_content}</native-counter>`;
}

declare global {
  interface HTMLElementTagNameMap {
    'native-counter': NativeCounter;
  }
}
