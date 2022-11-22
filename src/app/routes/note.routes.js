module.exports = (app) => {
  const notes = require('../controllers/note.controller');

  app.post('/note', notes.create);

  app.get('/notes', notes.findAll);

  app.get('/notes/:noteId', notes.findOne);

  app.delete('/notes/:noteId', notes.delete);

  app.put('/notes/:noteId', notes.update);
};
