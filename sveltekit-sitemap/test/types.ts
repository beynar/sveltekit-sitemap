import { RO_Sitemap, DynamicRoutes, StaticRoutes, Routes, ReplaceParams, Folders, RobotPaths } from "../src";

type Expect<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

const sitemap = (<const>{
  "/": true,
  "/blogs": true,
  "/blogs/[id]": true,
  "/blogs/[id]/[post]": false,
  "/products": true,
  "/products/[id]": false
}) satisfies RO_Sitemap;

type S = typeof sitemap;

type test = [
  Expect<Equal<Routes<S>, "/" | "/blogs" | "/blogs/[id]" | "/blogs/[id]/[post]" | "/products" | "/products/[id]">>,
  Expect<Equal<DynamicRoutes<S>, "/blogs/[id]" | "/blogs/[id]/[post]" | "/products/[id]">>,
  Expect<Equal<StaticRoutes<S>, "/" | "/blogs" | "/products">>,
  Expect<Equal<ReplaceParams<"/blogs/[id]/[article]">, `/blogs/${string}/${string}`>>,
  Expect<Equal<ReplaceParams<"/blogs/[id]">, `/blogs/${string}`>>,
  Expect<Equal<ReplaceParams<"/blogs/">, `/blogs/`>>,
  Expect<Equal<Folders<S>, "/" | "/blogs/" | "/blogs/[id]/" | "/products/">>
];
