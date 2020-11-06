const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const linkSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;