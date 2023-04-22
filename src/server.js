// CommonJS module syntax (require); ES6 module syntax (import) is not supported in Node.js
import http from 'http';

const server = http.createServer((req, res) => {
  console.log('Escutando na porta 3333');
  return res.end('Hello World! Gooooooolll');
});

server.listen(3333);
