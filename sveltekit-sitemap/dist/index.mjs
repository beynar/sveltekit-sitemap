var S=Object.defineProperty;var h=Object.getOwnPropertySymbols;var $=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var d=(s,a,e)=>a in s?S(s,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[a]=e,f=(s,a)=>{for(var e in a||(a={}))$.call(a,e)&&d(s,e,a[e]);if(h)for(var e of h(a))b.call(a,e)&&d(s,e,a[e]);return s};var x=(s,a,e)=>new Promise((o,w)=>{var n=t=>{try{r(e.next(t))}catch(i){w(i)}},l=t=>{try{r(e.throw(t))}catch(i){w(i)}},r=t=>t.done?o(t.value):Promise.resolve(t.value).then(n,l);r((e=e.apply(s,a)).next())});var u=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");var D=(s,a)=>w=>x(void 0,[w],function*({event:e,resolve:o}){if(e.url.pathname==="/sitemap.xml"){let n=yield a.getRoutes(e.locals),l=Object.keys(s).reduce((r,t)=>(t.includes("[")||Object.assign(r,{[t]:{path:t}}),r),{});return Object.entries(s).forEach(([r])=>{let t=n[r];t&&(Array.isArray(t)?t.forEach(i=>{Object.assign(l,{[i.path]:i})}):Object.assign(l,{[t.path]:t}))}),new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
xmlns:pagemap="http://www.google.com/schemas/sitemap-pagemap/1.0"
xmlns:xhtml="http://www.w3.org/1999/xhtml">
${Object.values(l).map(({path:r,priority:t,changeFreq:i,image:m,lastMod:c})=>{var p,y;return`  <url>
    <loc>${e.url.origin}${r}</loc>
  </url>
  ${c?`<lastmod>${c}</lastmod>`:""}
  ${t?`<priority>${t}</priority>`:""}
  ${i?`<changefreq>${i}</changefreq>`:""}
  ${m?`
    <image:image>
      <image:loc>${u(m.url)}</image:loc>
      <image:title>${u((p=m.title)!=null?p:" ")}</image:title>
      <image:caption>${u((y=m.altText)!=null?y:" ")}</image:caption>
    </image:image>`:""}`}).join(`
`)}
</urlset>`,{status:200,headers:{"Content-Type":"application/xml"}})}if(e.url.pathname==="/robot.txt"){let n=yield a.getRobots(e.locals),l=[],r=t=>{let i=Object.entries(t.paths).reduce((m,[c,p])=>(p?m.allow.push(c):m.disallow.push(c),m),{allow:[],disallow:[]});Array.isArray(t.userAgent)?t.userAgent.forEach(m=>{l.push(f({agent:m,crawlDelay:t.crawlDelay},i))}):l.push(f({agent:t.userAgent||"*",crawlDelay:t.crawlDelay},i))};return typeof n=="boolean"?l.push({agent:"*",allow:n===!0?["/"]:[],disallow:n===!1?["/"]:[]}):Array.isArray(n)?n.forEach(r):r(n),new Response(`${l.map(({agent:t,crawlDelay:i,allow:m,disallow:c})=>`User-agent: ${t}
Sitemap: ${e.url.origin}/sitemap.xml
${i?`Crawl-delay: ${i}`:""}
${m.map(p=>`Allow: ${p}`).join(`
`)}
${c.map(p=>`Disallow: ${p}`).join(`
`)}
`.replace(/\n\n/g,`
`).replace(/\n\n/g,`
`)).join(`
`)}
`.trim(),{headers:{"content-type":"text/plain","cache-control":`max-age=${60*60*24}`}})}return o(e)});import g from"fs";var R=s=>{let a={},e=o=>{let w=o.replace(s,"").replace("/+page.svelte","");g.statSync(o).isDirectory()&&g.readdirSync(o).forEach(r=>e(o+"/"+r));let n=o.replace("/+page.svelte",""),l=g.statSync(n).isDirectory()&&g.readdirSync(o.replace("/+page.svelte","")).some(r=>g.statSync(n+"/"+r).isDirectory());Object.assign(a,{[w||"/"]:l})};return g.readdirSync(s).forEach(o=>e(s+"/"+o)),a},E=({routesDir:s="./src/routes",sitemapFile:a="./src/sitemap.ts"}={})=>{function e(){g.writeFileSync(a,`import type { RO_Sitemap } from 'sveltekit-sitemap';

export const sitemap = (<const>${JSON.stringify(R(s),null,3).replace(/\uFFFF/g,'\\"')}) satisfies RO_Sitemap

export type Sitemap = typeof sitemap
`)}return e(),{name:"sveltify-sitemap",configureServer(o){o.watcher.add([s]).on("add",e).on("unlink",e).on("unlinkDir",e)}}};export{R as getRoutes,D as sitemapHook,E as sitemapPlugin};
//# sourceMappingURL=index.mjs.map