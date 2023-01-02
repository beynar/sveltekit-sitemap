import type { RO_Sitemap } from 'sveltekit-sitemap';

export const sitemap = (<const>{
   "/": true,
   "/blogs": true,
   "/blogs/[id]": true,
   "/blogs/[id]/[post]": false,
   "/products": true,
   "/products/[id]": false
}) satisfies RO_Sitemap

export type Sitemap = typeof sitemap
