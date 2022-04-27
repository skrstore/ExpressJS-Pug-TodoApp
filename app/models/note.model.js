const mongoose = require('mongoose');

let noteSchema = new mongoose.Schema({
    title: String
}, {
        timestamps: true
    })

module.exports = mongoose.model('Note', noteSchema)