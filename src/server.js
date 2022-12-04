const express = require('express');
const session = require('express-session');
const flash = require('express-flash');

const app = express();
const viewEngine = 'pug'; // 'pug' || 'ejs';

// for session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000000,
    },
  })
);
app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(req.url, req.method, res.statusCode);
  next();
});
app.use('/', express.static('./src/public'));

app.set('view engine', viewEngine);
app.set('views', `./src/views/${viewEngine}`);

app.get('/', (req, res) => res.redirect('/todo'));
app.use('/todo', require('./apps/todo/todo.routes'));
app.use('/user', require('./apps/user/user.routes'));

// to handle invalid requests
app.use((req, res) => res.status(404).send('Invalid Request'));

module.exports = { app };
