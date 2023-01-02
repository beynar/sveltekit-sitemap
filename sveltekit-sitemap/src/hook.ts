import type { Handle } from "@sveltejs/kit";
import type { SitemapParams, RO_Sitemap, RouteInfo, UserAgent } from "./types";
import { encodeXML } from "./utils";

export const sitemapHook =
  <S extends RO_Sitemap>(sitemap: S, params: SitemapParams<S>): Handle =>
  async ({ event, resolve }) => {
    if (event.url.pathname === "/sitemap.xml") {
      // Get dynamic custom infos for app routes
      const infos = await params.getRoutes(event.locals);

      // Instantiate a routes object with all the static routes
      // The will be override if you pass custom settings
      const routes: Record<string, RouteInfo<string>> = Object.keys(sitemap).reduce((acc, route) => {
        const isDynamic = route.includes("[");
        if (!isDynamic) {
          Object.assign(acc, { [route]: { path: route } });
        }
        return acc;
      }, {});

      // Add custom route data to the routes object
      Object.entries(sitemap).forEach(([route]) => {
        const routeInfo = infos[route as keyof typeof infos];
        if (routeInfo) {
          if (Array.isArray(routeInfo)) {
            routeInfo.forEach((route) => {
              Object.assign(routes, { [route.path]: route });
            });
          } else {
            Object.assign(routes, { [routeInfo.path]: routeInfo });
          }
        }
      });

      // Build and return sitemap
      // refs : https://github.com/sveltejs/kit/issues/1142#issuecomment-1032407693 https://github.com/Shopify/hydrogen/blob/1de3864214d04d9214e323d7f0a953c7b9309b7b/templates/demo-store/src/routes/sitemap.xml.server.ts

      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
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
    <loc>${event.url.origin}${path}</loc>
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
</urlset>`,
        {
          status: 200,
          headers: {
            "Content-Type": "application/xml"
          }
        }
      );
    }

    if (event.url.pathname === "/robot.txt") {
      // Get dynamic robots directives
      const robots = await params.getRobots(event.locals);
      // Instantiate the agents to render array
      const agentsToRender: { agent: string; crawlDelay?: number; allow: string[]; disallow: string[] }[] = [];

      const parseAgent = (agent: UserAgent<S>) => {
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

      // Build a return the robots.txt
      return new Response(
        `${agentsToRender
          .map(({ agent, crawlDelay, allow, disallow }) =>
            `User-agent: ${agent}
Sitemap: ${event.url.origin}/sitemap.xml
${crawlDelay ? `Crawl-delay: ${crawlDelay}` : ""}
${allow.map((route) => `Allow: ${route}`).join("\n")}
${disallow.map((route) => `Disallow: ${route}`).join("\n")}
`
              // Make it pretty
              .replace(/\n\n/g, "\n")
              .replace(/\n\n/g, "\n")
          )
          .join("\n")}
`.trim(),
        {
          headers: {
            "content-type": "text/plain",
            // Cache it for 24 hours
            "cache-control": `max-age=${60 * 60 * 24}`
          }
        }
      );
    }

    return resolve(event);
  };
