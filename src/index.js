const mongoose = require('mongoose');

const { app } = require('./server');

// TODO: it dotenv needed(npm i dotenv)
// require("dotenv").config();

const config = {
  MONGODB_URL:
    process.env.MONGODB_URL || 'mongodb://admin:admin@localhost:27017/',
  DB_NAME: process.env.DB_NAME || 'test',
  PORT: process.env.PORT || 3000,
};

(async () => {
  await mongoose.connect(config.MONGODB_URL, { dbName: config.DB_NAME });
  console.log('[MongoDB] Connected');

  app.listen(config.PORT, () => {
    console.log(`[Server] Listening on ${config.PORT}`);
  });
})();
