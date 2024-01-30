const template = document.createElement('template');
template.innerHTML = `
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
  <button id="btn">count is <span id="count"></span></button>`;

class NativeCounter extends HTMLElement {
  private count = 0;
  constructor() {
    super();
    this.count = 0;
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
    this.shadowRoot!.getElementById('btn')!.onclick = () => this.inc();
    this.update(this.count);
  }

  inc() {
    this.update(++this.count);
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
