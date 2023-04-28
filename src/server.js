// CommonJS module syntax (require); ES6 module syntax (import) is not supported in Node.js
import http from 'http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';

/*
  request: all the information about the request made by the user
  - create user
  - list user
  - edit user
  - delete user

  - HTTP
    - Methods: GET, POST, PUT, PATCH, DELETE
    - URL

  GET => get information
  POST => create information
  PUT => update information (multiple fields for example)
  PATCH => update specific information in the backend
  DELETE => delete information

  response: all the information about the response that will be sent back to the user

  Application Stateful and Stateless
    - Stateful: the server remembers the user with application save in memory.
    - Stateless: the server does not remember the user, the user must send the information again(like from a database).

  Headers
    - Content-Type: application/json
*/

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const router = routes.find(route => {
    return route.method === method && route.url === url;
  })

  if (router) {
    return router.handler(req, res);
  }

  return res.writeHead(404).end('Not found');
});

server.listen(3333);
