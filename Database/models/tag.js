const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
}, { timestamps: true });

const tag = mongoose.model('tag', tagSchema);

module.exports = tag;
