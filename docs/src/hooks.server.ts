import type { Handle } from '@sveltejs/kit';
import { sitemapHook } from 'sveltekit-sitemap';
import { sitemap } from './sitemap';
export const handle: Handle = sitemapHook(sitemap, {
	getRoutes: async () => {
		return {
			'/blogs/[id]': [{ path: '/blogs/test/test' }],
			'/blogs/[id]/[post]': [{ path: '/blogs/test/test' }],
			'/products/[id]': [{ path: '/products/test' }],
			'/products': { path: '/products' }
		};
	},
	getRobots: async () => {
		return {
			userAgent: ['*', 'Googlebot-Image'],
			paths: {
				'/$': true,
				'/': false
			},
			crawlDelay: 1000
		};
	}
});
