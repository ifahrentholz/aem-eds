declare class NativeCounter extends HTMLElement {
    private count;
    constructor();
    connectedCallback(): void;
    inc(): void;
    update(count: number): void;
}
export default function (block: HTMLElement): void;
declare global {
    interface HTMLElementTagNameMap {
        'native-counter': NativeCounter;
    }
}
export {};
