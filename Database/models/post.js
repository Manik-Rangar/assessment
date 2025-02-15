const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "tags" }],
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
