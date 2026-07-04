# Tasks CRUD API

A simple in-memory CRUD REST API for managing tasks, built with Node.js and Express.

## Setup

```bash
npm install
npm start
```

The server runs on `http://localhost:3000` by default (override with the `PORT` env var).

## Endpoints

| Method | Route              | Description         | Body                                |
|--------|---------------------|----------------------|--------------------------------------|
| GET    | `/api/tasks`         | List all tasks       | –                                    |
| GET    | `/api/tasks/:id`      | Get a single task    | –                                    |
| POST   | `/api/tasks`          | Create a task        | `{ "title": "string", "completed": boolean }` |
| PUT    | `/api/tasks/:id`      | Update a task        | `{ "title": "string", "completed": boolean }` |
| DELETE | `/api/tasks/:id`      | Delete a task        | –                                    |

## Example

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Write blog post"}'
```

For `PUT /api/tasks/:id`, send a partial JSON object with the fields you want to update.

## Notes

- Data is stored in memory and resets whenever the server restarts.
- Swap the in-memory array in `server.js` for a real database (MongoDB, Postgres, etc.) for production use.
