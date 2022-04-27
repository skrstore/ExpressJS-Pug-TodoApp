const Note = require('../models/note.model')

exports.create = (req, res) => {
    const note = new Note({
        title: req.body.title || "Note 1"
    })

    note.save()
        .then(data => {
            console.log(data)
            // res.send(data);
            res.render('note', { data: data })
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
}

exports.findAll = (req, res) => {
    Note.find()
        .then(notes => {
            console.log(notes)
            // res.send(notes);
            res.render('notes', { notes: notes })
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
}

exports.findOne = (req, res) => {
    // console.log(req.params.noteId)
    Note.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                console.log(note);
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            console.log(note);
            // res.send(note);
            res.render('note', { data: note })
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        });
}

exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.noteId
            });
        });
}

exports.update = (req, res) => {
    // // Validate Request
    // if (!req.body.content) {
    //     return res.status(400).send({
    //         message: "Note content can not be empty"
    //     });
    // }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.noteId
            });
        });
}