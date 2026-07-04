const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory data store (replace with a real database in production)
let tasks = [
  { id: 1, title: 'Learn Express', completed: false },
  { id: 2, title: 'Build a CRUD API', completed: false }
];
let nextId = 3;

// Helper to find a task or send a 404
function findTaskOrFail(req, res) {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) {
    res.status(404).json({ error: `Task with id ${id} not found` });
    return null;
  }
  return task;
}

// CREATE - POST /api/tasks
app.post('/api/tasks', (req, res) => {
  const { title, completed } = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'title is required and must be a string' });
  }
  const newTask = { id: nextId++, title, completed: Boolean(completed) };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// READ ALL - GET /api/tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// READ ONE - GET /api/tasks/:id
app.get('/api/tasks/:id', (req, res) => {
  const task = findTaskOrFail(req, res);
  if (task) res.json(task);
});

// UPDATE - PUT /api/tasks/:id
app.put('/api/tasks/:id', (req, res) => {
  const task = findTaskOrFail(req, res);
  if (!task) return;

  const { title, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = Boolean(completed);

  res.json(task);
});

// DELETE - DELETE /api/tasks/:id
app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: `Task with id ${id} not found` });
  }
  tasks.splice(index, 1);
  res.status(204).send();
});

// Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Tasks API running on http://localhost:${PORT}`);
});
