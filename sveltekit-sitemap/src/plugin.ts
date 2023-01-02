import fs from "fs";
import type { ViteDevServer } from "vite";
import { Sitemap, SitemapPluginParams } from "./types";

export const getRoutes = (dir: string): Sitemap => {
  let routes: Sitemap = {};
  const traverseRoutes = (path: string) => {
    const id = path.replace(dir, "").replace("/+page.svelte", "");

    if (fs.statSync(path).isDirectory()) {
      fs.readdirSync(path).forEach((file) => traverseRoutes(path + "/" + file));
    }

    const dirBase = path.replace("/+page.svelte", "");

    const isFolder =
      fs.statSync(dirBase).isDirectory() &&
      fs.readdirSync(path.replace("/+page.svelte", "")).some((p) => {
        return fs.statSync(dirBase + "/" + p).isDirectory();
      });
    Object.assign(routes, { [id || "/"]: isFolder });
  };
  fs.readdirSync(dir).forEach((file) => traverseRoutes(dir + "/" + file));

  return routes;
};

export const sitemapPlugin = ({
  routesDir = "./src/routes",
  sitemapFile = "./src/sitemap.ts"
}: SitemapPluginParams = {}) => {
  function updateSitemap() {
    fs.writeFileSync(
      sitemapFile,
      `import type { RO_Sitemap } from 'sveltekit-sitemap';

export const sitemap = (<const>${JSON.stringify(getRoutes(routesDir), null, 3).replace(
        /\uFFFF/g,
        '\\"'
      )}) satisfies RO_Sitemap

export type Sitemap = typeof sitemap
`
    );
  }
  updateSitemap();

  return {
    name: "sveltify-sitemap",
    configureServer(server: ViteDevServer) {
      server.watcher
        .add([routesDir])
        .on("add", updateSitemap)
        .on("unlink", updateSitemap)
        .on("unlinkDir", updateSitemap);
    }
  };
};
