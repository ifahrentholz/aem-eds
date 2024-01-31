import { LitElement } from 'lit';
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
export declare class LitCarousel extends LitElement {
    slides: CarouselData[];
    render(): import("lit-html").TemplateResult<1>;
}
export default function (block: HTMLElement): void;
declare global {
    interface HTMLElementTagNameMap {
        'lit-carousel': LitCarousel;
    }
}
export {};
