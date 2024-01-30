// const LCP_BLOCKS: string[] = []; // add your LCP blocks to the list

import { addClasses } from '../src/utils/addClasses';
import { getMetadata } from '../src/utils/getMetadata';
import { toCamelCase } from '../src/utils/toCamelCase';
import { toClassName } from '../src/utils/toClassName';

class Main {
  constructor() {}

  init = async () => {
    await this.loadEager();
  };

  private loadEager = async () => {
    // TODO: how to support different languages here
    document.documentElement.lang = 'en';
    this.decorateTemplateAndTheme();
    const main = document.querySelector('main');
    if (main) {
      this.initSections(main);
      this.decorateBlocks(main);
      document.body.classList.add('appear');
      // await this.waitForLCP(LCP_BLOCKS);
    }
  };

  // private loadLazy = async () => {};

  private decorateTemplateAndTheme() {
    const template = getMetadata('template');
    if (template) addClasses(document.body, template);
    const theme = getMetadata('theme');
    if (theme) addClasses(document.body, theme);
  }

  /**
   * Decorates all sections in a container element.
   * @param {Element} main The container element
   */
  private initSections(main: HTMLElement) {
    main.querySelectorAll<HTMLDivElement>(':scope > div').forEach((section) => {
      const wrappers: HTMLDivElement[] = [];
      let defaultContent = false;
      [...section.children].forEach((e) => {
        if (e.tagName === 'DIV' || !defaultContent) {
          const wrapper = document.createElement('div');
          wrappers.push(wrapper);
          defaultContent = e.tagName !== 'DIV';
          if (defaultContent) wrapper.classList.add('default-content-wrapper');
        }
        wrappers[wrappers.length - 1].append(e);
      });
      wrappers.forEach((wrapper) => section.append(wrapper));
      section.classList.add('section');
      section.dataset.sectionStatus = 'initialized';
      section.style.display = 'none';

      // Process section metadata
      const sectionMeta = section.querySelector('div.section-metadata');
      if (sectionMeta) {
        const meta = this.readBlockConfig(sectionMeta);
        Object.keys(meta).forEach((key) => {
          if (key === 'style') {
            const styles = meta.style
              .split(',')
              .filter((style: string) => style)
              .map((style: string) => toClassName(style.trim()));
            styles.forEach((style: string) => section.classList.add(style));
          } else {
            section.dataset[toCamelCase(key)] = meta[key];
          }
        });
        if (sectionMeta.parentElement) sectionMeta.parentElement.remove();
      }
    });
  }

  /**
   * Decorates all blocks in a container element.
   * @param {Element} main The container element
   */
  private decorateBlocks(main: HTMLElement) {
    main.querySelectorAll<HTMLDivElement>('div.section > div > div').forEach(this.decorateBlock);
  }

  /**
   * Decorates a block.
   * @param {Element} block The block element
   */
  private decorateBlock(block: HTMLElement) {
    const shortBlockName = block.classList[0];
    if (shortBlockName) {
      block.classList.add('block');
      block.dataset.blockName = shortBlockName;
      block.dataset.blockStatus = 'initialized';
      const blockWrapper = block.parentElement;
      blockWrapper?.classList.add(`${shortBlockName}-wrapper`);
      const section = block.closest('.section');
      if (section) section.classList.add(`${shortBlockName}-container`);
    }
  }

  /**
   * Extracts the config from a block.
   * @param {Element} block The block element
   * @returns {object} The block config
   */
  private readBlockConfig(block: Element): Record<string, any> {
    const config = {};
    block.querySelectorAll(':scope > div').forEach((row) => {
      if (row.children) {
        const cols = [...row.children];
        if (cols[1]) {
          const col = cols[1];
          const name = toClassName(cols[0].textContent ?? '');
          let value: string | string[] = '';
          if (col.querySelector('a')) {
            const as = [...col.querySelectorAll('a')];
            if (as.length === 1) {
              value = as[0].href;
            } else {
              value = as.map((a) => a.href);
            }
          } else if (col.querySelector('img')) {
            const imgs = [...col.querySelectorAll('img')];
            if (imgs.length === 1) {
              value = imgs[0].src;
            } else {
              value = imgs.map((img) => img.src);
            }
          } else if (col.querySelector('p')) {
            const ps = [...col.querySelectorAll('p')];
            if (ps.length === 1) {
              value = ps[0].textContent;
            } else {
              value = ps.map((p) => p.textContent);
            }
          } else value = row.children[1].textContent;
          config[name] = value;
        }
      }
    });
    return config;
  }

  // private waitForLCP = async (lcpBlocks: string[]) => {
  //   const block: HTMLElement | null = document.querySelector('.block');
  //   const hasLCPBlock = block && lcpBlocks.includes(block.dataset.blockName);
  //   if (hasLCPBlock) await loadBlock(block);

  //   document.body.style.removeProperty('display');
  // };
}

(async function () {
  const main = new Main();
  await main.init();
})();
