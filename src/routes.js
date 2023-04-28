import { Database } from './database.js';
import { randomUUID } from 'crypto';

const database = new Database(); // Stateful

export const routes = [
  {
    method: 'GET',
    url: '/users',
    handler: async (req, res) => {
      const users = database.select('users');

      // Early return
      return res.end(JSON.stringify(users));
    },
  },
  {
    method: 'POST',
    url: '/users',
    handler: async (req, res) => {
      const { name, email } = req.body;

      const users = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert('users', users);

      return res.writeHead(201).end('Create user');
    },
  }
]