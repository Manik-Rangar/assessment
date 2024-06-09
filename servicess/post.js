const model = require('./../Database/models/post');

// Fetch All Posts From Database
exports.getPosts = async (query, projection, options) => {
    return await model.find(query, projection, options)
};

// Fetch Posts By Id
exports.getPostById = async (postId) => {
    return await model.find({ _id: postId })
};

// Create New Post
exports.createPost = async (postData) => {
    const post = await model.create(postData)
    if (post)
        return { message: "Post Created Successfuly" }
};

// Update Posts Based On PostId
exports.updatePost = async (postId, postData) => {
    const post = await model.findByIdAndUpdate(postId, postData, { new: true }).lean()
    if (post)
        return post
};