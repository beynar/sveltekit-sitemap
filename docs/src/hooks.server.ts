import type { Handle } from '@sveltejs/kit';
import { sitemapHook } from 'sveltekit-sitemap';
import { sitemap } from './sitemap';

export const handle: Handle = sitemapHook(sitemap, {
	getRoutes: async () => {
		return {
			'/blogs/[id]': [{ path: '/blogs/test' }],
			'/blogs/[id]/[post]': [{ path: '/blogs/test/test' }],
			'/products/[id]': [{ path: '/products/test' }]
		};
	},
	getRobots: async () => {
		return {
			userAgent: ['*', 'Googlebot-Image'],
			paths: {
				'/blogs/': false
			},
			crawlDelay: 1000
		};
	}
});
