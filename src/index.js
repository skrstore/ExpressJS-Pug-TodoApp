const express = require('express');
const mongoose = require('mongoose');

const dbConfig = require('./config/database.config.js');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', './src/app/views');
app.set('view engine', 'pug');

mongoose
  .connect(dbConfig.urlCloud, { dbName: 'test' })
  .then(() => console.log('DB connected'))
  .catch((err) => {
    console.log(`${err.name}\nDB not connected`);
  });

app.use('/', express.static('./src/app/public'));

app.get('/create', (req, res) => {
  res.render('create', { title: 'Create Note' });
});

require('./app/routes/note.routes')(app);

app.listen(port, console.log(`Server running on Port ${port}!`));
