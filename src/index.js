const express = require('express');
const mongoose = require('mongoose');

const config = {
  MONGODB_URL:
    process.env.MONGODB_URL || 'mongodb://admin:admin@localhost:27017/',
  DB_NAME: process.env.DB_NAME || 'test',
  PORT: process.env.PORT || 3000,
};

const main = async () => {
  try {
    const app = express();

    await mongoose.connect(config.MONGODB_URL, { dbName: config.DB_NAME });
    console.log('[MongoDB] Connected');

    app.use(express.urlencoded({ extended: true }));
    app.set('views', './src/views/todo');
    app.set('view engine', 'pug');

    app.use('/', express.static('./src/public'));
    require('./apps/todo/todo.routes')(app);

    app.listen(config.PORT, () => {
      console.log(`[Server] Listening on ${config.PORT}`);
    });
  } catch (error) {
    console.log('[Error]', error);
    process.exit(1);
  }
};

main();
