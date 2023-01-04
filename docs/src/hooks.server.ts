import type { Handle } from '@sveltejs/kit';
import { sitemapHook } from 'sveltekit-sitemap';
import { sitemap } from './sitemap';

export const handle: Handle = sitemapHook(sitemap, {
	getRoutes: async () => {
		return {
			'/about': {
				path: '/',
				changeFreq: 'Monthly',
				priority: '0.2',
				lastMod: '2023-01-01'
			},
			'/': {
				path: '/',
				changeFreq: 'Monthly',
				priority: '0.3',
				lastMod: '2023-01-01'
			},
			// ^-- Static routes are automaticly added to the sitemap. But if you want to customize them, you can pass a route definition object.
			'/products/[id]': [
				{ path: '/products/test' },
				{ path: '/products/test' },
				{ path: '/products/test' }
			]
			// ^-- For dynamic route you have to pass an array of route defintions
		};
	},
	getRobots: async () => {
		return {
			userAgent: ['*', 'Googlebot-Image'],
			paths: {
				'/blogs/': false,
				'/blogs/[id]': {
					'/blogs/id': true
				}
			},
			crawlDelay: 1000
		};
	}
});
