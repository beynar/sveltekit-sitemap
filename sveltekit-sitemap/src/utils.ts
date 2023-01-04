import { RO_Sitemap, RouteDefinitions, RouteDefinition, Sitemap, UserAgentDirective } from "./types";
import fs from "fs";

export const encodeXML = (str: string) => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

export const generateSitemap = <S extends RO_Sitemap>(
  definitions: RouteDefinitions<S>,
  baseUrl: string,
  sitemap: S
) => {
  // Instantiate a routes object with all the static routes
  // The will be override if you pass custom settings
  const routes: Record<string, RouteDefinition<string>> = Object.keys(sitemap).reduce((acc, route) => {
    const isDynamic = route.includes("[");
    if (!isDynamic) {
      Object.assign(acc, {
        [route]: { path: route, priority: route === "/" ? "1.0" : "0.7" } as RouteDefinition<string>
      });
    }
    return acc;
  }, {});

  // Add custom route data to the routes object
  Object.entries(sitemap).forEach(([route]) => {
    const RouteDefinition = definitions[route as keyof typeof definitions];
    if (RouteDefinition) {
      if (Array.isArray(RouteDefinition)) {
        RouteDefinition.forEach((route) => {
          Object.assign(routes, { [route.path]: route });
        });
      } else {
        Object.assign(routes, { [RouteDefinition.path]: RouteDefinition });
      }
    }
  });

  // Build and return sitemap
  // refs : https://github.com/sveltejs/kit/issues/1142#issuecomment-1032407693 https://github.com/Shopify/hydrogen/blob/1de3864214d04d9214e323d7f0a953c7b9309b7b/templates/demo-store/src/routes/sitemap.xml.server.ts
  return `<?xml version="1.0" encoding="UTF-8"?>
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
${Object.values(routes)
  .map(({ path, priority, changeFreq, image, lastMod }) => {
    return `  <url>
    <loc>${baseUrl}${path}</loc>
  </url>
  ${lastMod ? `<lastmod>${lastMod}</lastmod>` : ""}
  ${priority ? `<priority>${priority}</priority>` : ""}
  ${changeFreq ? `<changefreq>${changeFreq}</changefreq>` : ""}
  ${
    image
      ? `
    <image:image>
      <image:loc>${encodeXML(image.url)}</image:loc>
      <image:title>${encodeXML(image.title ?? " ")}</image:title>
      <image:caption>${encodeXML(image.altText ?? " ")}</image:caption>
    </image:image>`
      : ""
  }`;
  })
  .join("\n")}
</urlset>`;
};

export const generateRobots = <S extends RO_Sitemap>(
  robots: boolean | UserAgentDirective<S> | UserAgentDirective<S>[],
  baseUrl: string
) => {
  // Instantiate the agents to render array
  const agentsToRender: { agent: string; crawlDelay?: number; allow: string[]; disallow: string[] }[] = [];

  const parseAgent = (agent: UserAgentDirective<S>) => {
    const infos = Object.entries(agent.paths).reduce<{ allow: string[]; disallow: string[] }>(
      (acc, [route, allow]) => {
        if (allow) {
          acc.allow.push(route);
        } else {
          acc.disallow.push(route);
        }
        return acc;
      },
      { allow: [], disallow: [] }
    );

    // Use the same config for all the user agents
    if (Array.isArray(agent.userAgent)) {
      agent.userAgent.forEach((a) => {
        agentsToRender.push({
          agent: a,
          crawlDelay: agent.crawlDelay,
          ...infos
        });
      });
    } else {
      agentsToRender.push({
        agent: agent.userAgent || "*",
        crawlDelay: agent.crawlDelay,
        ...infos
      });
    }
  };

  // Build a default robot.txt for all user-agents
  if (typeof robots === "boolean") {
    agentsToRender.push({
      agent: "*",
      allow: robots === true ? ["/"] : [],
      disallow: robots === false ? ["/"] : []
    });
  } else if (!Array.isArray(robots)) {
    parseAgent(robots);
  } else {
    robots.forEach(parseAgent);
  }

  return `${agentsToRender
    .map(({ agent, crawlDelay, allow, disallow }) =>
      `User-agent: ${agent}
Sitemap: ${baseUrl}/sitemap.xml
${crawlDelay ? `Crawl-delay: ${crawlDelay}` : ""}
${allow.map((route) => `Allow: ${route}`).join("\n")}
${disallow.map((route) => `Disallow: ${route}`).join("\n")}
`
        // Make it pretty
        .replace(/\n\n/g, "\n")
        .replace(/\n\n/g, "\n")
    )
    .join("\n")}
`.trim();
};

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
