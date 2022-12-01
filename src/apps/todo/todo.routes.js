const express = require('express');
const router = express.Router();

const Todo = require('./todo.models');
const User = require('./../user/user.models');
const { checkAuth } = require('./../../middleware');

router.get('/create', (req, res) => {
  res.render('create', { title: 'Create Note' });
});

router.post('/todo', async (req, res) => {
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

router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.render('todos', { todos: todos });
  } catch (error) {
    res.status(500).send({ message: error.message, status: 'fail' });
  }
});

router.get('/todos/:todoId', async (req, res) => {
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

router.delete('/todos/:todoId', (req, res) => {
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

router.put('/todos/:todoId', (req, res) => {
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

// home
router.get('/', checkAuth, (req, res) => {
  User.find({ email: req.session.email }).then((users) => {
    let userId = users[0]._id;
    Todo.find({ userId: userId })
      .then((result) => {
        let user = { email: req.session.email };
        res.render('home', { todos: result, user: user });
      })
      .catch((err) => {
        res.send('Error Occured');
      });
  });
});

// add new todo
router.post('/addtodo', checkAuth, (req, res) => {
  User.find({ email: req.session.email }).then((users) => {
    let userId = users[0]._id;

    let todo1 = new Todo({ title: req.body.todo, userId: userId });

    todo1.save().then((result) => {
      res.redirect('/');
    });
  });
});

// update todo get
router.get('/update/:id', checkAuth, (req, res) => {
  Todo.findById(req.params.id)
    .then((result) => {
      let user = { email: req.session.email };
      res.render('update', { data: result, user: user });
    })
    .catch((err) => {
      res.send('Error Occured');
    });
});

// update todo post
router.post('/update/:id', checkAuth, (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, { title: req.body.todo }).then(
    (result) => {
      res.redirect('/');
    }
  );
});

// delete todo
router.get('/delete/:id', checkAuth, (req, res) => {
  Todo.findOneAndDelete({ _id: req.params.id }).then((result) => {
    res.redirect('/');
  });
});

module.exports = router;
