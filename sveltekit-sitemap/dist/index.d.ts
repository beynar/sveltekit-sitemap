import * as type_fest_source_readonly_deep from 'type-fest/source/readonly-deep';
import { ReadonlyDeep, SetOptional } from 'type-fest';
import { Handle } from '@sveltejs/kit';
import { ViteDevServer } from 'vite';

type RO_Sitemap = ReadonlyDeep<Sitemap>;
type Sitemap = Record<string, boolean>;
type Routes<S extends RO_Sitemap> = Str<keyof S>;
type DynamicRoutes<S extends RO_Sitemap, R extends Routes<S> = Routes<S>> = R extends `/${infer B}/[${infer P}]` ? `/${B}/[${P}]` : never;
type Folders<S extends RO_Sitemap> = Str<{
    [K in keyof S]: S[K] extends true ? (K extends string ? (K extends "/" ? "/" : `${K}/`) : never) : never;
}[keyof S]>;
type Str<P> = P extends string ? P : never;
type StaticRoutes<S extends RO_Sitemap, R extends Routes<S> = Routes<S>> = Str<R extends `/${infer B}/[${infer P}]` ? never : R>;
type Priority = "1.0 " | "0.9" | "0.8" | "0.7" | "0.6" | "0.5" | "0.4" | "0.3" | "0.2" | "0.1" | "0.0";
type Frequency = "Always" | "Hourly" | "Weekly" | "Monthly" | "Yearly" | "Never";
type RouteInfo<P extends string> = {
    path: ReplaceParams<P>;
    lastMod?: string;
    /**
     * 1. Always
     * These page types are constantly changing and will include index pages on major news publications, Google News, stock market data, and social bookmarking categories.
     * 2. Hourly
     * These pages update every hour and will also include major news publications as well as weather services and forums.
     * 3. Daily
     * Pages updated on average once per day and include things like blog posts, smaller web forum pages, message boards, and classified ads.
     * 4. Weekly
     * Updates typically occur once per week, these pages will include website directories, product pricing pages, and smaller blogs.
     * 5. Monthly
     * These are updated once per month, give or take, and include category pages, FAQs, and sometimes Help Desk articles that change slightly. Refer to the section above for guidelines on what is considered to be a change frequency trigger.
     * 6. Yearly
     * Updates  on these pages happen on an annual basis and are typically your contact page, “About” page, login pages, and registration pages.
     * 7. Never
     * As the name suggests, these pages never ever get updates. These are really old blog posts, press releases, notifications about updates that never need updating, and completely static pages.
     */
    changeFreq?: Frequency;
    /**
     * 1.0-0.8
     * Homepage, product information, landing pages.
     * 0.7-0.4
     * News articles, some weather services, blog posts, pages that no site would be complete without.
     * 0.3-0.0
     * FAQs, outdated info, old press releases, completely static pages that are still relevant enough to keep from deleting entirely.
     */
    priority?: Priority;
    image?: {
        url: string;
        title?: string | null;
        altText?: string | null;
    };
};
type RobotPaths<S extends Sitemap> = {
    [K in Routes<S> | Folders<S> | "/$" | (string & {})]?: K extends DynamicRoutes<S> ? Record<string, boolean> : boolean;
};
type UserAgent<S extends Sitemap> = {
    userAgent?: string | string[];
    /**
     * How many seconds a crawler should wait before loading and crawling page content. Note that Googlebot does not acknowledge this command, but crawl rate can be set in Google Search Console.
     */
    crawlDelay?: number;
    paths: RobotPaths<S>;
};
type SitemapParams<S extends RO_Sitemap> = {
    disallow?: {
        [K in Routes<S> | (string & {})]?: boolean;
    };
    getRobots: (locals: App.Locals) => Promise<boolean | UserAgent<S> | UserAgent<S>[]>;
    getRoutes: (locals: App.Locals) => Promise<SetOptional<{
        [K in Routes<S>]: K extends StaticRoutes<S> ? RouteInfo<K> : RouteInfo<K>[];
    }, StaticRoutes<S>>>;
};
type SitemapPluginParams = {
    routesDir?: string;
    sitemapFile?: string;
};
type ReplaceParams<S extends string, Delimiter extends string = "/"> = S extends `${infer Head}${Delimiter}${infer Tail}` ? Head extends `[${infer P}]` ? `${string}/${ReplaceParams<Tail, Delimiter>}` : `${Head}/${ReplaceParams<Tail, Delimiter>}` : S extends Delimiter ? "" : S extends `[${infer P}]` ? string : `${S}`;

declare const sitemapHook: <S extends type_fest_source_readonly_deep.ReadonlyObjectDeep<Sitemap>>(sitemap: S, params: SitemapParams<S>) => Handle;

declare const getRoutes: (dir: string) => Sitemap;
declare const sitemapPlugin: ({ routesDir, sitemapFile }?: SitemapPluginParams) => {
    name: string;
    configureServer(server: ViteDevServer): void;
};

export { DynamicRoutes, Folders, RO_Sitemap, ReplaceParams, RobotPaths, RouteInfo, Routes, Sitemap, SitemapParams, SitemapPluginParams, StaticRoutes, Str, UserAgent, getRoutes, sitemapHook, sitemapPlugin };
