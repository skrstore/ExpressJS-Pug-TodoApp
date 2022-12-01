const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');

// TODO: it dotenv needed(npm i dotenv)
// require("dotenv").config();

const config = {
  MONGODB_URL:
    process.env.MONGODB_URL || 'mongodb://admin:admin@localhost:27017/',
  DB_NAME: process.env.DB_NAME || 'test',
  PORT: process.env.PORT || 3000,
};

(async () => {
  const app = express();

  await mongoose.connect(config.MONGODB_URL, { dbName: config.DB_NAME });
  console.log('[MongoDB] Connected');

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

  // app.set('views', './src/views/pug/todo');
  // app.set('view engine', 'pug');
  // app.use('/', express.static('./src/public'));

  app.set('view engine', 'ejs');
  app.set('views', './src/views/ejs');

  // app.get('/', (req, res) => {
  //   res.redirect('/todo');
  // });

  require('./apps/try/try.controller')(app);

  app.use('/', require('./apps/todo/todo.routes'));
  app.use('/todo', require('./apps/todo/todo.routes'));

  app.use('/user', require('./apps/user/user'));
  app.use('/admin', require('./apps/admin/admin'));

  // to handle invalid requests
  app.use((req, res) => {
    res.status(404).send('Invalid Request');
  });

  app.listen(config.PORT, () => {
    console.log(`[Server] Listening on ${config.PORT}`);
  });
})();
