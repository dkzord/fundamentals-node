import { Database } from './database.js';
import { randomUUID } from 'crypto';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database(); // Stateful

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: async (req, res) => {
      const users = database.select('users');

      // Early return
      return res.end(JSON.stringify(users));
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
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
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: async (req, res) => {
      const { id } = req.params;

      database.delete('users', id);

      return res.writeHead(204).end('Delete user');
    },
  }
]