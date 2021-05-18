const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const pool = require('./db');
const PORT = process.env.PORT || 5000;
//middlewares
app.use(cors());
app.use(express.json());
// app.use(express.static('client/build'));
if (process.env.NODE_ENV === 'production') {
  // app.use(express.static(path.join(__dirname, 'client/build')));
  app.use(express.static('client/build'));
}
//routes
//create a todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description]
    );
    res.json(newTodo.rows);
  } catch (error) {
    console.log(error.message);
  }
});
//get all todo
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo ORDER BY todo_id');
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});
//get a todo
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
      id,
    ]);
    if (todo.rows[0] == null) {
      res.json('Todo Not Found');
    } else {
      res.json(todo.rows[0]);
    }
  } catch (error) {
    console.log(error.message);
  }
});
//update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
      id,
    ]);
    if (todo.rows[0] == null) {
      res.json('Todo Not Found');
    } else {
      const updatedTodo = await pool.query(
        'UPDATE todo SET description = $1 WHERE todo_id = $2',
        [description, id]
      );
      res.json('Todo updated !');
    }
  } catch (error) {
    console.log(error.message);
  }
});
//delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
      id,
    ]);
    if (todo.rows[0] == null) {
      res.json('Todo Not Found');
    } else {
      const deleteTodo = await pool.query(
        'DELETE FROM todo WHERE todo_id = $1',
        [id]
      );
      res.json('Todo Deleted !');
    }
  } catch (error) {
    console.log(error.message);
  }
});
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
