// /users/:id
export function buildRoutePath(path) {
  const routerParamentersRegex = /:([a-zA-Z]+)/g;

  console.log(Array.from(path.matchAll(routerParamentersRegex)));
}

