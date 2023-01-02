import { getRoutes } from "../src/plugin";

test("get simple structured routes", () => {
  const routes = getRoutes("./test/routes");
  const result = {
    "/": true,
    "/blogs": true,
    "/blogs/[id]": true,
    "/blogs/[id]/[post]": false,
    "/products": true,
    "/products/[id]": false
  };

  expect(routes).toStrictEqual(result);
});

test("get nested routes without +page.svelte between theme", () => {
  const routes = getRoutes("./test/nested");
  const result = {
    "/": true,
    "/pages": true,
    "/pages/[id]": false
  };

  expect(routes).toStrictEqual(result);
});

test("get nested routes without +page.svelte between theme", () => {
  const routes = getRoutes("./test/dynamic");
  const result = {
    "/": true,
    "/[...pages]": false
  };

  expect(routes).toStrictEqual(result);
});
