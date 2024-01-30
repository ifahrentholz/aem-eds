# Startup procedure

- [] loadPage
  - [] loadEager
    - [] set document lang
    - [] decorate template and theme (decorateTemplateAndTheme)
      basically sets body classes for template & theme
      ```
      function decorateTemplateAndTheme() {
              const addClasses = (element, classes) => {
                  classes.split(',').forEach((c) => {
                  element.classList.add(toClassName(c.trim()));
              });
          };
          const template = getMetadata('template');
          if (template) addClasses(document.body, template);
          const theme = getMetadata('theme');
          if (theme) addClasses(document.body, theme);
      }
      ```
    - [] decorateMain
      ```
      export function decorateMain(main) {
         // hopefully forward compatible button decoration
         decorateButtons(main);
         decorateIcons(main);
         decorateSections(main);
         decorateBlocks(main);
      }
      ```
    - []
