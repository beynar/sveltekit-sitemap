var x=Object.defineProperty;var u=Object.getOwnPropertySymbols;var $=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var f=(t,i,e)=>i in t?x(t,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[i]=e,c=(t,i)=>{for(var e in i||(i={}))$.call(i,e)&&f(t,e,i[e]);if(u)for(var e of u(i))R.call(i,e)&&f(t,e,i[e]);return t};var S=(t,i,e)=>new Promise((r,a)=>{var s=m=>{try{n(e.next(m))}catch(p){a(p)}},o=m=>{try{n(e.throw(m))}catch(p){a(p)}},n=m=>m.done?r(m.value):Promise.resolve(m.value).then(s,o);n((e=e.apply(t,i)).next())});import l from"fs";var g=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;"),h=(t,i,e)=>{let r=Object.keys(e).reduce((a,s)=>(s.includes("[")||Object.assign(a,{[s]:{path:s}}),a),{});return Object.entries(e).forEach(([a])=>{let s=t[a];s&&(Array.isArray(s)?s.forEach(o=>{Object.assign(r,{[o.path]:o})}):Object.assign(r,{[s.path]:s}))}),`<?xml version="1.0" encoding="UTF-8"?>
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
${Object.values(r).map(({path:a,priority:s,changeFreq:o,image:n,lastMod:m})=>{var p,w;return`  <url>
    <loc>${i}${a}</loc>
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
</urlset>`},y=(t,i)=>{let e=[],r=a=>{let s=Object.entries(a.paths).reduce((o,[n,m])=>(m?o.allow.push(n):o.disallow.push(n),o),{allow:[],disallow:[]});Array.isArray(a.userAgent)?a.userAgent.forEach(o=>{e.push(c({agent:o,crawlDelay:a.crawlDelay},s))}):e.push(c({agent:a.userAgent||"*",crawlDelay:a.crawlDelay},s))};return typeof t=="boolean"?e.push({agent:"*",allow:t===!0?["/"]:[],disallow:t===!1?["/"]:[]}):Array.isArray(t)?t.forEach(r):r(t),`${e.map(({agent:a,crawlDelay:s,allow:o,disallow:n})=>`User-agent: ${a}
Sitemap: ${i}/sitemap.xml
${s?`Crawl-delay: ${s}`:""}
${o.map(m=>`Allow: ${m}`).join(`
`)}
${n.map(m=>`Disallow: ${m}`).join(`
`)}
`.replace(/\n\n/g,`
`).replace(/\n\n/g,`
`)).join(`
`)}
`.trim()},d=t=>{let i={},e=r=>{let a=r.replace(t,"").replace("/+page.svelte","");l.statSync(r).isDirectory()&&l.readdirSync(r).forEach(n=>e(r+"/"+n));let s=r.replace("/+page.svelte",""),o=l.statSync(s).isDirectory()&&l.readdirSync(r.replace("/+page.svelte","")).some(n=>l.statSync(s+"/"+n).isDirectory());Object.assign(i,{[a||"/"]:o})};return l.readdirSync(t).forEach(r=>e(t+"/"+r)),i};var k=(t,i)=>a=>S(void 0,[a],function*({event:e,resolve:r}){if(e.url.pathname==="/sitemap.xml"){let s=yield i.getRoutes(e);return new Response(h(s,e.url.origin,t),{status:200,headers:{"Content-Type":"application/xml"}})}if(e.url.pathname==="/robot.txt"){let s=yield i.getRobots(e);return new Response(y(s,e.url.origin),{headers:{"content-type":"text/plain","cache-control":`max-age=${60*60*24}`}})}return r(e)});import D from"fs";var U=({routesDir:t="./src/routes",sitemapFile:i="./src/sitemap.ts"}={})=>{function e(){D.writeFileSync(i,`import type { RO_Sitemap } from 'sveltekit-sitemap';

export const sitemap = (<const>${JSON.stringify(d(t),null,3).replace(/\uFFFF/g,'\\"')}) satisfies RO_Sitemap

export type Sitemap = typeof sitemap
`)}return e(),{name:"sveltekit-sitemap",configureServer(r){r.watcher.add([t]).on("add",e).on("unlink",e).on("unlinkDir",e)}}};export{g as encodeXML,y as generateRobots,h as generateSitemap,d as getRoutes,k as sitemapHook,U as sitemapPlugin};
//# sourceMappingURL=index.mjs.map