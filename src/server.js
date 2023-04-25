// CommonJS module syntax (require); ES6 module syntax (import) is not supported in Node.js
import http from 'http';

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

const users = []; // Stateful

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    req.body = null;
  }

  if (method === 'GET' && url === '/users') {

    // Early return
    return res
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body;

    users.push({
      id: 1,
      name,
      email,
    });

    return res.writeHead(201).end('Create user')
  }

  return res.writeHead(404).end('Not found');
});

server.listen(3333);
