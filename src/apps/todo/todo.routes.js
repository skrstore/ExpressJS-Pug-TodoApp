const Todo = require('./todo.models');

module.exports = (app) => {
  app.get('/create', (req, res) => {
    res.render('create', { title: 'Create Note' });
  });

  app.post('/todo', async (req, res) => {
    try {
      const todo = new Todo({
        title: req.body.title,
        detail: req.body.detail || '',
      });

      const savedTodo = await todo.save();
      res.render('todo', { data: savedTodo });
    } catch (error) {
      res.status(500).send({ message: error.message, status: 'fail' });
    }
  });

  app.get('/todos', async (req, res) => {
    try {
      const todos = await Todo.find();
      res.render('todos', { todos: todos });
    } catch (error) {
      res.status(500).send({ message: error.message, status: 'fail' });
    }
  });

  app.get('/todos/:todoId', async (req, res) => {
    const { todoId } = req.params;
    try {
      const existingTodo = await Todo.findById(todoId);

      if (!existingTodo) {
        return res.status(404).send({
          message: 'Todo not found with id ' + todoId,
          status: 'fail',
        });
      }
      res.render('todo', { data: existingTodo });
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Invalid Id: ' + todoId,
          status: 'fail',
        });
      }
      res.status(500).send({ message: error.message, status: 'fail' });
    }
  });

  app.delete('/todos/:todoId', (req, res) => {
    const { todoId } = req.params;
    Todo.findByIdAndRemove(todoId)
      .then((todo) => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo not found with id ' + todoId,
          });
        }
        res.send({ message: 'Todo deleted successfully!' });
      })
      .catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
            message: 'Todo not found with id ' + todoId,
          });
        }
        return res.status(500).send({
          message: 'Could not delete todo with id ' + todoId,
        });
      });
  });

  app.put('/todos/:todoId', (req, res) => {
    const { todoId } = req.params;
    // Find todo and update it with the request body
    Todo.findByIdAndUpdate(
      todoId,
      {
        title: req.body.title || 'Untitled Todo',
      },
      { new: true }
    )
      .then((todo) => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo not found with id ' + todoId,
          });
        }
        res.send(todo);
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'Todo not found with id ' + todoId,
          });
        }
        return res.status(500).send({
          message: 'Error updating Todo with id ' + todoId,
        });
      });
  });
};
