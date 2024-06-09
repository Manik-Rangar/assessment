// Creating Post Router 
const express = require('express');
const postRoute = express.Router();
// Converts JSON to Req JSON
const planeToJSON = require('./../helper/helper');
const { createPost, getPosts, updatePost } = require('../servicess/post');
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { getPostValidation, createPostValidation } = require('./../validations/postValidationSchema')

// Create New Post
postRoute.post('/posts', upload.single('image'), async (req, res) => {
    // Check Request Body Valiation
    const validation = createPostValidation.validate(req.body)
    if (validation.error)
        return planeToJSON(res, {
            ...validation.error.details
        })

    // Converting File To Base 64
    const payload = { ...req.body }
    const file = req.file;
    if (file) {
        const base64 = file.buffer.toString('base64')
        payload.image = base64

    }

    const response = await createPost(payload)
    return planeToJSON(res, {
        ...response
    })
});

// Update Existing Post
postRoute.put(`/posts/:postId`, upload.single('image'), async (req, res) => {
    const postId = req.params.postId
    const updatePayload = { ...req.body }
    const file = req.file;
    if (file) {
        const base64 = file.buffer.toString('base64')
        updatePayload["image"] = base64

    }
    const response = await updatePost(postId, updatePayload)
    return planeToJSON(res, {
        ...response
    })
});

// Get All Post Based On Filters
postRoute.get('/posts', async (req, res) => {
    const validation = getPostValidation.validate(req.query)
    if (validation.error)
        return res.status(400).json({
            message: "BAD REQUEST",
            ...validation.error.details
        })
    let { skip, limit, keyword, tag, sort } = req.query;
    skip = parseInt(skip) || 0
    limit = parseInt(limit) || 20
    const query = {

    }
    const projection = {
        title: 1,
        description: 1,
        tags: 1,
        image: 1,
        createdAt: 1,
        updatedAt: 1
    }
    const options = {
        skip: req.query.skip,
        limit: req.query.limit,
        sort: { createdAt: -1 }
    }
    if (keyword) {
        query.$or = [
            { title: { $regex: keyword, $options: 'i' } },
            { desc: { $regex: keyword, $options: 'i' } },
        ];
    }
    if (tag) {
        query.tags = tag
    }
    if (sort)
        options.sort = { [sort]: 1 }

    const posts = await getPosts(query, projection, options)
    return planeToJSON(res, {
        data: posts
    })
});

module.exports = postRoute;
