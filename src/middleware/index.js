function checkAuth(req, res, next) {
  if (req.session.token) {
    next();
  } else {
    req.flash('info', 'You need to Login');
    res.redirect('/user/login');
  }
}

module.exports = { checkAdmin, checkAuth };
