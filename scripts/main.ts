// const LCP_BLOCKS: string[] = []; // add your LCP blocks to the list

import { addClasses } from '../src/utils/addClasses';
import { getMetadata } from '../src/utils/getMetadata';
import { toCamelCase } from '../src/utils/toCamelCase';
import { toClassName } from '../src/utils/toClassName';

type ComponentMapping = {
  name: string;
  element: HTMLDivElement;
};

class BlockService {
  /**
   * Extracts the config from a block.
   * @param {Element} block The block element
   * @returns {object} The block config
   */
  readBlockConfig(block: Element): Record<string, any> {
    const config: Record<any, any> = {};
    block.querySelectorAll(':scope > div').forEach((row) => {
      if (row.children) {
        const cols = [...row.children];
        if (cols[1]) {
          const col = cols[1];
          const name = toClassName(cols[0].textContent ?? '');
          let value: any = '';
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

  /**
   * Decorates all blocks in a container element.
   * @param {Element} main The container element
   */
  decorateBlocks(main: HTMLElement) {
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
      const blockWrapper = block.parentElement;
      blockWrapper?.classList.add(`${shortBlockName}-wrapper`);
      const section = block.closest('.section');
      if (section) section.classList.add(`${shortBlockName}-container`);
    }
  }
}

class SectionService {
  constructor(private blockService: BlockService) {}

  init(container: HTMLElement) {
    this.transformSection(container);
  }

  /**
   * Decorates all sections in a container element.
   * @param {Element} main The container element
   */
  private transformSection(main: HTMLElement) {
    main.querySelectorAll<HTMLDivElement>(':scope > div').forEach((section) => {
      this.adjustMarkup(section);
      this.processSectionMetaData(section);
    });
  }

  private processSectionMetaData(section: HTMLElement) {
    // Process section metadata
    const sectionMeta = section.querySelector('div.section-metadata');
    if (sectionMeta) {
      const meta = this.blockService.readBlockConfig(sectionMeta);
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
  }

  private adjustMarkup(section: HTMLDivElement) {
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
  }
}

class Main {
  constructor(
    private sectionService: SectionService,
    private blockService: BlockService
  ) {}

  init = async () => {
    this.setup();
    await this.loadEager();
  };

  /**
   * Setup block utils.
   */
  private setup() {
    window.hlx = window.hlx || {};
    window.hlx.RUM_MASK_URL = 'full';
    window.hlx.codeBasePath = '';
    window.hlx.lighthouse = new URLSearchParams(window.location.search).get('lighthouse') === 'on';

    const scriptEl = document.querySelector('script[src$="/scripts/scripts.js"]') as HTMLScriptElement;
    if (scriptEl) {
      try {
        [window.hlx.codeBasePath] = new URL(scriptEl.src).pathname.split('/scripts/scripts.js');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  }

  private loadEager = async () => {
    // TODO: how to support different languages here
    document.documentElement.lang = 'en';
    this.decorateTemplateAndTheme();
    const main = document.querySelector('main');
    if (main) {
      this.sectionService.init(main);
      this.blockService.decorateBlocks(main);
      this.loadComponents();
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

  private loadComponents = async () => {
    const sections = document.querySelectorAll<HTMLElement>('.section');
    sections.forEach((section) => {
      const components: ComponentMapping[] = [];
      section.querySelectorAll<HTMLDivElement>('[data-block-name]').forEach((block: HTMLDivElement) => {
        components.push({
          name: block.dataset['blockName'] as string,
          element: block,
        });
      });
      if (components.length) {
        components.forEach(async (component) => {
          const componentModule = await import(
            `${window.hlx.codeBasePath}/blocks/${component.name}/__compiled__/${component.name}.js`
          );
          if (componentModule.default) {
            await componentModule.default(component.element);
          }
        });
      }
      section.style.removeProperty('display');
    });
  };
}

(async function () {
  const blockService = new BlockService();
  const sectionService = new SectionService(blockService);
  const main = new Main(sectionService, blockService);
  await main.init();
})();

// /**
//  * Loads JS and CSS for a block.
//  * @param {Element} block The block element
//  */
// async function loadBlock(block) {
//   const status = block.dataset.blockStatus;
//   if (status !== 'loading' && status !== 'loaded') {
//     block.dataset.blockStatus = 'loading';
//     const { blockName } = block.dataset;
//     try {
//       const cssLoaded = loadCSS(`${window.hlx.codeBasePath}/blocks/${blockName}/${blockName}.css`);
//       const decorationComplete = new Promise((resolve) => {
//         (async () => {
//           try {
//             const mod = await import(`${window.hlx.codeBasePath}/blocks/${blockName}/${blockName}.js`);
//             if (mod.default) {
//               await mod.default(block);
//             }
//           } catch (error) {
//             // eslint-disable-next-line no-console
//             console.log(`failed to load module for ${blockName}`, error);
//           }
//           resolve();
//         })();
//       });
//       await Promise.all([cssLoaded, decorationComplete]);
//     } catch (error) {
//       // eslint-disable-next-line no-console
//       console.log(`failed to load block ${blockName}`, error);
//     }
//     block.dataset.blockStatus = 'loaded';
//   }
//   return block;
// }

declare global {
  interface Window {
    hlx: {
      RUM_MASK_URL: string;
      codeBasePath: string;
      lighthouse: boolean;
    };
  }
}
