const { Router } = require('express');

const { post } = require('../../services/api');

const router = Router();

router
  .route('/register')
  .get((req, res) => {
    res.render('register', { user: '' });
  })
  .post(async (req, res) => {
    const { email, password, username } = req.body;
    await post('auth/register', { username, email, password });

    req.flash('info', 'User Registered Successfully');
    res.redirect('/');
  });

router
  .route('/login')
  .get((req, res) => {
    res.render('login', { user: '' });
  })
  .post(async (req, res) => {
    const { email, password } = req.body;
    const response = await post('auth/login', { email, password });

    req.session.token = response.data.data.token;
    req.session.email = response.data.data.user.email;
    req.flash('info', 'Login Success');
    res.redirect('/');
  });

// to destroy the session
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
});

module.exports = router;
