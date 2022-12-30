function checkAuth(req, res, next) {
  if (req.session.token) {
    next();
  } else {
    req.flash('info', 'You need to Login');
    res.redirect('/auth/login');
  }
}

module.exports = { checkAuth };
