import { LitElement } from 'lit';
import './cards.scss';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class Cards extends LitElement {
    /**
     * The number of times the button has been clicked.
     */
    count: number;
    render(): import("lit-html").TemplateResult<1>;
    private _onClick;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'diva-cards': Cards;
    }
}
