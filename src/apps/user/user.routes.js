const express = require('express');

const { post } = require('../../services/api');

const router = express.Router();

// to send register page
router.get('/register', (req, res) => {
  res.render('register', { user: '' });
});

// to add new user
router.post('/register', async (req, res) => {
  const { email, password, username } = req.body;
  await post('auth/register', { username, email, password });

  req.flash('info', 'User Registered Successfully');
  res.redirect('/user/login');
});

// to send login page
router.get('/login', (req, res) => {
  res.render('login', { user: '' });
});

// to login the user after checking email and password
router.post('/login', async (req, res) => {
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
    res.redirect('/user/login');
  });
});

module.exports = router;
