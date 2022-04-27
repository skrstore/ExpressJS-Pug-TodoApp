const mongoose = require("mongoose");

let UserSchema = mongoose.Schema({
  name: String,
  email: String
});

module.exports = mongoose.model('User', UserSchema)
