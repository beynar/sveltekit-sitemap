var $=Object.defineProperty;var f=Object.getOwnPropertySymbols;var D=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var y=(t,s,e)=>s in t?$(t,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[s]=e,c=(t,s)=>{for(var e in s||(s={}))D.call(s,e)&&y(t,e,s[e]);if(f)for(var e of f(s))b.call(s,e)&&y(t,e,s[e]);return t};var S=(t,s,e)=>new Promise((r,a)=>{var i=o=>{try{l(e.next(o))}catch(m){a(m)}},n=o=>{try{l(e.throw(o))}catch(m){a(m)}},l=o=>o.done?r(o.value):Promise.resolve(o.value).then(i,n);l((e=e.apply(t,s)).next())});import p from"fs";var g=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;"),d=(t,s,e)=>{let r=Object.keys(e).reduce((a,i)=>(i.includes("[")||Object.assign(a,{[i]:{path:i,priority:i==="/"?"1.0":"0.7"}}),a),{});return Object.entries(e).forEach(([a])=>{let i=t[a];i&&(Array.isArray(i)?i.forEach(n=>{Object.assign(r,{[n.path]:n})}):Object.assign(r,{[(i==null?void 0:i.path)||a]:i}))}),`<?xml version="1.0" encoding="UTF-8"?>
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
${Object.entries(r).map(([a,{path:i,priority:n,changeFreq:l,image:o,lastMod:m}])=>{var u,w;return`  <url>
    <loc>${s}${i||a}</loc>
  </url>
  ${m?`<lastmod>${m}</lastmod>`:""}
  ${n?`<priority>${n}</priority>`:""}
  ${l?`<changefreq>${l}</changefreq>`:""}
  ${o?`
    <image:image>
      <image:loc>${g(o.url)}</image:loc>
      <image:title>${g((u=o.title)!=null?u:" ")}</image:title>
      <image:caption>${g((w=o.altText)!=null?w:" ")}</image:caption>
    </image:image>`:""}`}).join(`
`)}
</urlset>`},h=(t,s)=>{let e=[],r=a=>{let i=Object.entries(a.paths).reduce((n,[l,o])=>(o?n.allow.push(l):n.disallow.push(l),n),{allow:[],disallow:[]});Array.isArray(a.userAgent)?a.userAgent.forEach(n=>{e.push(c({agent:n,crawlDelay:a.crawlDelay},i))}):e.push(c({agent:a.userAgent||"*",crawlDelay:a.crawlDelay},i))};return typeof t=="boolean"?e.push({agent:"*",allow:t===!0?["/"]:[],disallow:t===!1?["/"]:[]}):Array.isArray(t)?t.forEach(r):r(t),`${e.map(({agent:a,crawlDelay:i,allow:n,disallow:l})=>`User-agent: ${a}
Sitemap: ${s}/sitemap.xml
${i?`Crawl-delay: ${i}`:""}
${n.map(o=>`Allow: ${o}`).join(`
`)}
${l.map(o=>`Disallow: ${o}`).join(`
`)}
`.replace(/\n\n/g,`
`).replace(/\n\n/g,`
`)).join(`
`)}
`.trim()},x=t=>{let s=p.readdirSync(t);return s.some(e=>e==="+page.svelte")?!0:s.some(e=>{let r=t+"/"+e;return p.statSync(r).isDirectory()?x(r):!1})},R=t=>{let s={},e=r=>{let a=p.statSync(r).isDirectory(),i=a&&x(r);a&&i&&p.readdirSync(r).forEach(m=>e(r+"/"+m));let n=r.replace(t,"").replace("/+page.svelte",""),l=r.replace("/+page.svelte",""),o=p.statSync(l).isDirectory()&&p.readdirSync(r.replace("/+page.svelte","")).some(m=>p.statSync(l+"/"+m).isDirectory());!r.endsWith("+page.svelte")&&!o||Object.assign(s,{[n||"/"]:o})};return p.readdirSync(t).forEach(r=>e(t+"/"+r)),s};var F=(t,s={})=>a=>S(void 0,[a],function*({event:e,resolve:r}){if(e.url.pathname==="/sitemap.xml"){let i=s.getRoutes?yield s.getRoutes(e):{};return new Response(d(i,e.url.origin,t),{status:200,headers:{"Content-Type":"application/xml"}})}if(e.url.pathname==="/robots.txt"){let i=s.getRobots?yield s.getRobots(e):!0;return new Response(h(i,e.url.origin),{headers:{"content-type":"text/plain","cache-control":`max-age=${60*60*24}`}})}return r(e)});import v from"fs";var H=({routesDir:t="./src/routes",sitemapFile:s="./src/sitemap.ts"}={})=>{function e(){v.writeFileSync(s,`import type { RO_Sitemap } from 'sveltekit-sitemap';

export const sitemap = (<const>${JSON.stringify(R(t),null,3).replace(/\uFFFF/g,'\\"')}) satisfies RO_Sitemap

export type Sitemap = typeof sitemap
`)}return e(),{name:"sveltekit-sitemap",configureServer(r){r.watcher.add([t]).on("add",e).on("unlink",e).on("unlinkDir",e)}}};export{g as encodeXML,h as generateRobots,d as generateSitemap,R as getRoutes,F as sitemapHook,H as sitemapPlugin};
//# sourceMappingURL=index.mjs.map