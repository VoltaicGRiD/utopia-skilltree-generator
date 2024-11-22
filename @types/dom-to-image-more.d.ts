declare module 'dom-to-image-more' {
  export function toPng(node: HTMLElement, options?: object): Promise<string>;
}