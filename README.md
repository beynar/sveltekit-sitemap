# sveltekit-sitemap

This library is designed to help developers easily generate dynamic sitemaps for their SvelteKit apps. With a simple API, it makes it easy to create and maintain on demand sitemap and robot.txt, ensuring that search engines can find and index all of the important pages on a site.

It's a combination of a Vite plugin and a Svelte-kit hook. The plugin is responsible to watch your routes folder to generate a typescript representation of it. The hook is responsible to deliver sitemap.xml and robots.txt responses based on your params and the former typescript sitemap.

This library is not meant to generate a static sitemap at build time. It's there to help you deliver ssr sitemaps. If you want a static sitemap take a look at svelte-sitemap.
