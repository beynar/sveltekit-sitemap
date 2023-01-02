import { sveltekit } from '@sveltejs/kit/vite';
import { sitemapPlugin } from 'sveltekit-sitemap';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), sitemapPlugin()]
};

export default config;
