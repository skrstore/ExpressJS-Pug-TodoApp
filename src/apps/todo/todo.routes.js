const { Router } = require('express');

const { get, post, patch, delete1 } = require('../../services/api');

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    const response = await get('todo', req.session.token);
    res.render('todos', {
      todos: response.data.data,
      user: { email: req.session.email },
    });
  })
  .post(async (req, res) => {
    await post('todo', { title: req.body.todo }, req.session.token);

    res.redirect('/');
  });

// update todo
router
  .route('/update/:id')
  .get(async (req, res) => {
    const response = await get('todo/' + req.params.id, req.session.token);
    let user = { email: req.session.email };

    res.render('update', { data: response.data.data, user: user });
  })
  .post(async (req, res) => {
    await patch(
      'todo/' + req.params.id,
      { title: req.body.todo },
      req.session.token
    );
    res.redirect('/');
  });

// delete todo
router.get('/delete/:id', async (req, res) => {
  await delete1('todo/' + req.params.id, req.session.token);
  res.redirect('/');
});

module.exports = router;
