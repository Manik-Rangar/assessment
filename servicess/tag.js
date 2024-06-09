const model = require('../Database/models/tag');

// Fetch All Tags 
exports.getTags = async (query, projection, options) => {
    return await model.find(query, projection, options)
};

// Fetch Tags By Id
exports.getTagById = async (tagId) => {
    return await model.find({ _id: tagId })
};

// Create New Tag
exports.createTag = async (tagData) => {
    const tag = await model.create(tagData)
    if (tag)
        return { message: "Tag created successfuly" }
};