const { app } = require('./server');

// TODO: it dotenv needed(npm i dotenv)
// require("dotenv").config();

const config = {
  PORT: process.env.PORT || 3000,
};

(async () => {
  app.listen(config.PORT, () => {
    console.log(`[Server] Listening on ${config.PORT}`);
  });
})();
