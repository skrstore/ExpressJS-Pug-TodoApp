const express = require('express');
const router = express.Router();

const { checkAuth } = require('./../../middleware');
const { get, post, patch, delete1 } = require('../../services/api');

// home
router.get('/', checkAuth, async (req, res) => {
  const response = await get('todo', req.session.token);
  res.render('home', {
    todos: response.data.data,
    user: { email: req.session.email },
  });
});

// add new todo
router.post('/addtodo', checkAuth, async (req, res) => {
  await post('todo', { title: req.body.todo }, req.session.token);

  res.redirect('/');
});

// update todo get
router.get('/update/:id', checkAuth, async (req, res) => {
  const response = await get('todo/' + req.params.id, req.session.token);
  let user = { email: req.session.email };

  res.render('update', { data: response.data.data, user: user });
});

// update todo post
router.post('/update/:id', checkAuth, async (req, res) => {
  await patch(
    'todo/' + req.params.id,
    { title: req.body.todo },
    req.session.token
  );
  res.redirect('/');
});

// delete todo
router.get('/delete/:id', checkAuth, async (req, res) => {
  await delete1('todo/' + req.params.id, req.session.token);
  res.redirect('/');
});

module.exports = router;
