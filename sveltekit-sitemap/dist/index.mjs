var x=Object.defineProperty;var u=Object.getOwnPropertySymbols;var $=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var f=(t,r,e)=>r in t?x(t,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[r]=e,c=(t,r)=>{for(var e in r||(r={}))$.call(r,e)&&f(t,e,r[e]);if(u)for(var e of u(r))R.call(r,e)&&f(t,e,r[e]);return t};var S=(t,r,e)=>new Promise((a,i)=>{var s=m=>{try{n(e.next(m))}catch(p){i(p)}},o=m=>{try{n(e.throw(m))}catch(p){i(p)}},n=m=>m.done?a(m.value):Promise.resolve(m.value).then(s,o);n((e=e.apply(t,r)).next())});import l from"fs";var g=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;"),h=(t,r,e)=>{let a=Object.keys(e).reduce((i,s)=>(s.includes("[")||Object.assign(i,{[s]:{path:s}}),i),{});return Object.entries(e).forEach(([i])=>{let s=t[i];s&&(Array.isArray(s)?s.forEach(o=>{Object.assign(a,{[o.path]:o})}):Object.assign(a,{[s.path]:s}))}),`<?xml version="1.0" encoding="UTF-8"?>
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
${Object.values(a).map(({path:i,priority:s,changeFreq:o,image:n,lastMod:m})=>{var p,w;return`  <url>
    <loc>${r}${i}</loc>
  </url>
  ${m?`<lastmod>${m}</lastmod>`:""}
  ${s?`<priority>${s}</priority>`:""}
  ${o?`<changefreq>${o}</changefreq>`:""}
  ${n?`
    <image:image>
      <image:loc>${g(n.url)}</image:loc>
      <image:title>${g((p=n.title)!=null?p:" ")}</image:title>
      <image:caption>${g((w=n.altText)!=null?w:" ")}</image:caption>
    </image:image>`:""}`}).join(`
`)}
</urlset>`},y=(t,r)=>{let e=[],a=i=>{let s=Object.entries(i.paths).reduce((o,[n,m])=>(m?o.allow.push(n):o.disallow.push(n),o),{allow:[],disallow:[]});Array.isArray(i.userAgent)?i.userAgent.forEach(o=>{e.push(c({agent:o,crawlDelay:i.crawlDelay},s))}):e.push(c({agent:i.userAgent||"*",crawlDelay:i.crawlDelay},s))};return typeof t=="boolean"?e.push({agent:"*",allow:t===!0?["/"]:[],disallow:t===!1?["/"]:[]}):Array.isArray(t)?t.forEach(a):a(t),`${e.map(({agent:i,crawlDelay:s,allow:o,disallow:n})=>`User-agent: ${i}
Sitemap: ${r}/sitemap.xml
${s?`Crawl-delay: ${s}`:""}
${o.map(m=>`Allow: ${m}`).join(`
`)}
${n.map(m=>`Disallow: ${m}`).join(`
`)}
`.replace(/\n\n/g,`
`).replace(/\n\n/g,`
`)).join(`
`)}
`.trim()},d=t=>{let r={},e=a=>{let i=a.replace(t,"").replace("/+page.svelte","");l.statSync(a).isDirectory()&&l.readdirSync(a).forEach(n=>e(a+"/"+n));let s=a.replace("/+page.svelte",""),o=l.statSync(s).isDirectory()&&l.readdirSync(a.replace("/+page.svelte","")).some(n=>l.statSync(s+"/"+n).isDirectory());Object.assign(r,{[i||"/"]:o})};return l.readdirSync(t).forEach(a=>e(t+"/"+a)),r};var k=(t,r)=>i=>S(void 0,[i],function*({event:e,resolve:a}){if(e.url.pathname==="/sitemap.xml"){let s=yield r.getRoutes(e);return new Response(h(s,e.url.origin,t),{status:200,headers:{"Content-Type":"application/xml"}})}if(e.url.pathname==="/robot.txt"){let s=yield r.getRobots(e);return new Response(y(s,e.url.origin),{headers:{"content-type":"text/plain","cache-control":`max-age=${60*60*24}`}})}return a(e)});import O from"fs";var U=({routesDir:t="./src/routes",sitemapFile:r="./src/sitemap.ts"}={})=>{function e(){O.writeFileSync(r,`import type { RO_Sitemap } from 'sveltekit-sitemap';

export const sitemap = (<const>${JSON.stringify(d(t),null,3).replace(/\uFFFF/g,'\\"')}) satisfies RO_Sitemap

export type Sitemap = typeof sitemap
`)}return e(),{name:"sveltekit-sitemap",configureServer(a){a.watcher.add([t]).on("add",e).on("unlink",e).on("unlinkDir",e)}}};export{g as encodeXML,y as generateRobots,h as generateSitemap,d as getRoutes,k as sitemapHook,U as sitemapPlugin};
//# sourceMappingURL=index.mjs.map