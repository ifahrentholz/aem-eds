function d(o){return typeof o=="string"?o.toLowerCase().replace(/[^0-9a-z]/gi,"-").replace(/-+/g,"-").replace(/^-|-$/g,""):""}const m=(o,e)=>{e.split(",").forEach(t=>{o.classList.add(d(t.trim()))})};function p(o,e=document){const t=o&&o.includes(":")?"property":"name",n=[...e.head.querySelectorAll(`meta[${t}="${o}"]`)].map(c=>c.content).join(", ");return n.length?n:""}function f(o){return d(o).replace(/-([a-z])/g,e=>e[1].toUpperCase())}class u{constructor(){this.init=async()=>{await this.loadEager()},this.loadEager=async()=>{document.documentElement.lang="en",this.decorateTemplateAndTheme();const e=document.querySelector("main");e&&(this.initSections(e),this.decorateBlocks(e),document.body.classList.add("appear"))}}decorateTemplateAndTheme(){const e=p("template");e&&m(document.body,e);const t=p("theme");t&&m(document.body,t)}initSections(e){e.querySelectorAll(":scope > div").forEach(t=>{const s=[];let n=!1;[...t.children].forEach(i=>{if(i.tagName==="DIV"||!n){const a=document.createElement("div");s.push(a),n=i.tagName!=="DIV",n&&a.classList.add("default-content-wrapper")}s[s.length-1].append(i)}),s.forEach(i=>t.append(i)),t.classList.add("section"),t.dataset.sectionStatus="initialized",t.style.display="none";const c=t.querySelector("div.section-metadata");if(c){const i=this.readBlockConfig(c);Object.keys(i).forEach(a=>{a==="style"?i.style.split(",").filter(r=>r).map(r=>d(r.trim())).forEach(r=>t.classList.add(r)):t.dataset[f(a)]=i[a]}),c.parentElement&&c.parentElement.remove()}})}decorateBlocks(e){e.querySelectorAll("div.section > div > div").forEach(this.decorateBlock)}decorateBlock(e){const t=e.classList[0];if(t){e.classList.add("block"),e.dataset.blockName=t,e.dataset.blockStatus="initialized";const s=e.parentElement;s==null||s.classList.add(`${t}-wrapper`);const n=e.closest(".section");n&&n.classList.add(`${t}-container`)}}readBlockConfig(e){const t={};return e.querySelectorAll(":scope > div").forEach(s=>{if(s.children){const n=[...s.children];if(n[1]){const c=n[1],i=d(n[0].textContent??"");let a="";if(c.querySelector("a")){const l=[...c.querySelectorAll("a")];l.length===1?a=l[0].href:a=l.map(r=>r.href)}else if(c.querySelector("img")){const l=[...c.querySelectorAll("img")];l.length===1?a=l[0].src:a=l.map(r=>r.src)}else if(c.querySelector("p")){const l=[...c.querySelectorAll("p")];l.length===1?a=l[0].textContent:a=l.map(r=>r.textContent)}else a=s.children[1].textContent;t[i]=a}}}),t}}(async function(){await new u().init()})();
//# sourceMappingURL=main.js.map
