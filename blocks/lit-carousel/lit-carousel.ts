import { LitElement, html, render } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

type CarouselData = {
  image: string;
  description: string;
};

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('lit-carousel')
export class LitCarousel extends LitElement {
  @property({ type: Array })
  slides: CarouselData[];

  render() {
    return html`<div>
      ${this.slides.map((slide) => {
        return html`<div class="slide">
          <div class="slide__image">${unsafeHTML(slide.image)}</div>
          <div class="slide__description">${unsafeHTML(slide.description)}</div>
        </div>`;
      })}
    </div>`;
  }
}

export default function (block: HTMLElement) {
  const rows = block.querySelectorAll(':scope > div');
  const slides = [...rows].reduce((acc, row) => {
    const image = row.querySelector(':scope > div:first-child')?.innerHTML || '';
    const description = row.querySelector(':scope > div:last-child')?.innerHTML || '';
    return [...acc, { image, description }];
  }, []);
  block.innerHTML = '';
  render(html`<lit-carousel .slides="${slides}"></lit-carousel>`, block);
  block.style.removeProperty('display');
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-carousel': LitCarousel;
  }
}
