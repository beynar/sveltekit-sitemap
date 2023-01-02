# sveltekit-sitemap (and robots)

This library is designed to help developers easily generate dynamic sitemaps for their SvelteKit apps. With a simple API, it makes it easy to create and maintain on demand sitemap and robot.txt, ensuring that search engines can find and index all of the important pages on a site.

It's a combination of a Vite plugin and a Svelte-kit hook. The plugin is responsible to watch your routes folder to generate a typescript representation of it. The hook is responsible to deliver sitemap.xml and robots.txt responses based on your params and the former typescript sitemap.

This library is not meant to generate a static sitemap at build time. It's there to help you deliver ssr sitemaps. If you want a static sitemap take a look at svelte-sitemap.

## Usage

```shell
$ pnpm add sveltekit-sitemap
```

```shell
$ npm i sveltekit-sitemap
```

```shell
$ yarn add sveltekit-sitemap
```

1. Add the vite plugin

```ts
// vite.config.js

import { sveltekit } from "@sveltejs/kit/vite";
import { sitemapPlugin } from "sveltekit-sitemap";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), sitemapPlugin()]
};

export default config;
```

2. Use the hook with the generated sitemap and define your custom routes definitions and robots directive

```ts
// src/hooks.server.ts

import type { Handle } from "@sveltejs/kit";
import { sitemapHook } from "sveltekit-sitemap";
import { sitemap } from "./sitemap";
export const handle: Handle = sitemapHook(sitemap, {
  getRoutes: async () => {
    return {
      "/blogs/[id]": [{ path: "/blogs/test" }],
      "/blogs/[id]/[post]": [{ path: "/blogs/test/test" }],
      "/products/[id]": [{ path: "/products/test" }]
    };
  },
  getRobots: async () => {
    return {
      userAgent: ["*", "Googlebot-Image"],
      paths: {
        "/blogs/": false
      },
      crawlDelay: 1000
    };
  }
});
```
