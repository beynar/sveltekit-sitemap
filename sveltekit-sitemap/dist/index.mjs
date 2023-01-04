var x=Object.defineProperty;var w=Object.getOwnPropertySymbols;var R=Object.prototype.hasOwnProperty,$=Object.prototype.propertyIsEnumerable;var f=(t,s,e)=>s in t?x(t,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[s]=e,c=(t,s)=>{for(var e in s||(s={}))R.call(s,e)&&f(t,e,s[e]);if(w)for(var e of w(s))$.call(s,e)&&f(t,e,s[e]);return t};var S=(t,s,e)=>new Promise((r,a)=>{var i=m=>{try{n(e.next(m))}catch(p){a(p)}},o=m=>{try{n(e.throw(m))}catch(p){a(p)}},n=m=>m.done?r(m.value):Promise.resolve(m.value).then(i,o);n((e=e.apply(t,s)).next())});import l from"fs";var g=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;"),y=(t,s,e)=>{let r=Object.keys(e).reduce((a,i)=>(i.includes("[")||Object.assign(a,{[i]:{path:i,priority:i==="/"?"1.0":"0.7"}}),a),{});return Object.entries(e).forEach(([a])=>{let i=t[a];i&&(Array.isArray(i)?i.forEach(o=>{Object.assign(r,{[o.path]:o})}):Object.assign(r,{[i.path]:i}))}),`<?xml version="1.0" encoding="UTF-8"?>
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
${Object.values(r).map(({path:a,priority:i,changeFreq:o,image:n,lastMod:m})=>{var p,u;return`  <url>
    <loc>${s}${a}</loc>
  </url>
  ${m?`<lastmod>${m}</lastmod>`:""}
  ${i?`<priority>${i}</priority>`:""}
  ${o?`<changefreq>${o}</changefreq>`:""}
  ${n?`
    <image:image>
      <image:loc>${g(n.url)}</image:loc>
      <image:title>${g((p=n.title)!=null?p:" ")}</image:title>
      <image:caption>${g((u=n.altText)!=null?u:" ")}</image:caption>
    </image:image>`:""}`}).join(`
`)}
</urlset>`},d=(t,s)=>{let e=[],r=a=>{let i=Object.entries(a.paths).reduce((o,[n,m])=>(m?o.allow.push(n):o.disallow.push(n),o),{allow:[],disallow:[]});Array.isArray(a.userAgent)?a.userAgent.forEach(o=>{e.push(c({agent:o,crawlDelay:a.crawlDelay},i))}):e.push(c({agent:a.userAgent||"*",crawlDelay:a.crawlDelay},i))};return typeof t=="boolean"?e.push({agent:"*",allow:t===!0?["/"]:[],disallow:t===!1?["/"]:[]}):Array.isArray(t)?t.forEach(r):r(t),`${e.map(({agent:a,crawlDelay:i,allow:o,disallow:n})=>`User-agent: ${a}
Sitemap: ${s}/sitemap.xml
${i?`Crawl-delay: ${i}`:""}
${o.map(m=>`Allow: ${m}`).join(`
`)}
${n.map(m=>`Disallow: ${m}`).join(`
`)}
`.replace(/\n\n/g,`
`).replace(/\n\n/g,`
`)).join(`
`)}
`.trim()},h=t=>{let s={},e=r=>{let a=r.replace(t,"").replace("/+page.svelte","");l.statSync(r).isDirectory()&&l.readdirSync(r).forEach(n=>e(r+"/"+n));let i=r.replace("/+page.svelte",""),o=l.statSync(i).isDirectory()&&l.readdirSync(r.replace("/+page.svelte","")).some(n=>l.statSync(i+"/"+n).isDirectory());Object.assign(s,{[a||"/"]:o})};return l.readdirSync(t).forEach(r=>e(t+"/"+r)),s};var k=(t,s={})=>a=>S(void 0,[a],function*({event:e,resolve:r}){if(e.url.pathname==="/sitemap.xml"){let i=s.getRoutes?yield s.getRoutes(e):{};return new Response(y(i,e.url.origin,t),{status:200,headers:{"Content-Type":"application/xml"}})}if(e.url.pathname==="/robot.txt"){let i=s.getRobots?yield s.getRobots(e):!0;return new Response(d(i,e.url.origin),{headers:{"content-type":"text/plain","cache-control":`max-age=${60*60*24}`}})}return r(e)});import D from"fs";var U=({routesDir:t="./src/routes",sitemapFile:s="./src/sitemap.ts"}={})=>{function e(){D.writeFileSync(s,`import type { RO_Sitemap } from 'sveltekit-sitemap';

export const sitemap = (<const>${JSON.stringify(h(t),null,3).replace(/\uFFFF/g,'\\"')}) satisfies RO_Sitemap

export type Sitemap = typeof sitemap
`)}return e(),{name:"sveltekit-sitemap",configureServer(r){r.watcher.add([t]).on("add",e).on("unlink",e).on("unlinkDir",e)}}};export{g as encodeXML,d as generateRobots,y as generateSitemap,h as getRoutes,k as sitemapHook,U as sitemapPlugin};
//# sourceMappingURL=index.mjs.map