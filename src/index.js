const { app } = require('./server');

// TODO: Setup prettier, ESLint, editorconfig
// TODO: Update Login, Register Forms
// TODO: Update API Request Methods Name
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
