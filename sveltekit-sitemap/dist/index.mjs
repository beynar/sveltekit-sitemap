var R=Object.defineProperty;var f=Object.getOwnPropertySymbols;var D=Object.prototype.hasOwnProperty,$=Object.prototype.propertyIsEnumerable;var w=(t,s,e)=>s in t?R(t,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[s]=e,c=(t,s)=>{for(var e in s||(s={}))D.call(s,e)&&w(t,e,s[e]);if(f)for(var e of f(s))$.call(s,e)&&w(t,e,s[e]);return t};var d=(t,s,e)=>new Promise((r,o)=>{var i=a=>{try{l(e.next(a))}catch(m){o(m)}},n=a=>{try{l(e.throw(a))}catch(m){o(m)}},l=a=>a.done?r(a.value):Promise.resolve(a.value).then(i,n);l((e=e.apply(t,s)).next())});import p from"fs";var g=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;"),y=(t,s,e)=>{let r=Object.keys(e).reduce((o,i)=>(i.includes("[")||Object.assign(o,{[i]:{path:i,priority:i==="/"?"1.0":"0.7"}}),o),{});return Object.entries(e).forEach(([o])=>{let i=t[o];i&&(Array.isArray(i)?i.forEach(n=>{Object.assign(r,{[n.path]:n})}):Object.assign(r,{[i.path]:i}))}),`<?xml version="1.0" encoding="UTF-8"?>
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
${Object.values(r).map(({path:o,priority:i,changeFreq:n,image:l,lastMod:a})=>{var m,u;return`  <url>
    <loc>${s}${o}</loc>
  </url>
  ${a?`<lastmod>${a}</lastmod>`:""}
  ${i?`<priority>${i}</priority>`:""}
  ${n?`<changefreq>${n}</changefreq>`:""}
  ${l?`
    <image:image>
      <image:loc>${g(l.url)}</image:loc>
      <image:title>${g((m=l.title)!=null?m:" ")}</image:title>
      <image:caption>${g((u=l.altText)!=null?u:" ")}</image:caption>
    </image:image>`:""}`}).join(`
`)}
</urlset>`},S=(t,s)=>{let e=[],r=o=>{let i=Object.entries(o.paths).reduce((n,[l,a])=>(a?n.allow.push(l):n.disallow.push(l),n),{allow:[],disallow:[]});Array.isArray(o.userAgent)?o.userAgent.forEach(n=>{e.push(c({agent:n,crawlDelay:o.crawlDelay},i))}):e.push(c({agent:o.userAgent||"*",crawlDelay:o.crawlDelay},i))};return typeof t=="boolean"?e.push({agent:"*",allow:t===!0?["/"]:[],disallow:t===!1?["/"]:[]}):Array.isArray(t)?t.forEach(r):r(t),`${e.map(({agent:o,crawlDelay:i,allow:n,disallow:l})=>`User-agent: ${o}
Sitemap: ${s}/sitemap.xml
${i?`Crawl-delay: ${i}`:""}
${n.map(a=>`Allow: ${a}`).join(`
`)}
${l.map(a=>`Disallow: ${a}`).join(`
`)}
`.replace(/\n\n/g,`
`).replace(/\n\n/g,`
`)).join(`
`)}
`.trim()},h=t=>{let s=p.readdirSync(t);return s.some(e=>e==="+page.svelte")?!0:s.some(e=>{let r=t+"/"+e;return p.statSync(r).isDirectory()?h(r):!1})},x=t=>{let s={},e=r=>{let o=p.statSync(r).isDirectory(),i=o&&h(r);o&&i&&p.readdirSync(r).forEach(m=>e(r+"/"+m));let n=r.replace(t,"").replace("/+page.svelte",""),l=r.replace("/+page.svelte",""),a=p.statSync(l).isDirectory()&&p.readdirSync(r.replace("/+page.svelte","")).some(m=>p.statSync(l+"/"+m).isDirectory());!r.endsWith("+page.svelte")&&!a||Object.assign(s,{[n||"/"]:a})};return p.readdirSync(t).forEach(r=>e(t+"/"+r)),s};var k=(t,s={})=>o=>d(void 0,[o],function*({event:e,resolve:r}){if(e.url.pathname==="/sitemap.xml"){let i=s.getRoutes?yield s.getRoutes(e):{};return new Response(y(i,e.url.origin,t),{status:200,headers:{"Content-Type":"application/xml"}})}if(e.url.pathname==="/robot.txt"){let i=s.getRobots?yield s.getRobots(e):!0;return new Response(S(i,e.url.origin),{headers:{"content-type":"text/plain","cache-control":`max-age=${60*60*24}`}})}return r(e)});import v from"fs";var T=({routesDir:t="./src/routes",sitemapFile:s="./src/sitemap.ts"}={})=>{function e(){v.writeFileSync(s,`import type { RO_Sitemap } from 'sveltekit-sitemap';

export const sitemap = (<const>${JSON.stringify(x(t),null,3).replace(/\uFFFF/g,'\\"')}) satisfies RO_Sitemap

export type Sitemap = typeof sitemap
`)}return e(),{name:"sveltekit-sitemap",configureServer(r){r.watcher.add([t]).on("add",e).on("unlink",e).on("unlinkDir",e)}}};export{g as encodeXML,S as generateRobots,y as generateSitemap,x as getRoutes,k as sitemapHook,T as sitemapPlugin};
//# sourceMappingURL=index.mjs.map