function checkAuth(req, res, next) {
  if (req.session.token) {
    next();
  } else {
    req.flash('info', 'You need to Login');
    res.redirect('/user/login');
  }
}

function checkAdmin(req, res, next) {
  if (req.session.email && req.session.isAdmin) {
    next();
  } else {
    req.flash('info', 'You need to Login');
    res.redirect('/admin/login');
  }
}

module.exports = { checkAdmin, checkAuth };
