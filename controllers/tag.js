const express = require('express');
const tagRoute = express.Router();
const planeToJSON = require('./../helper/helper');
const { createTag, getTags } = require('../servicess/tag');

// Create New Tag
tagRoute.post('/tags', async (req, res) => {
    const response = await createTag(req.body)
    return planeToJSON(res, {
        ...response
    })
});

// Fetch All Tags With Filters
tagRoute.get('/tags', async (req, res) => {
    let { skip, limit } = req.query;
    skip = parseInt(skip) || 0
    limit = parseInt(limit) || 20
    const query = {

    }
    const projection = {
        name: 1
    }
    const options = {
        skip: req.query.skip,
        limit: req.query.limit
    }
    const tags = await getTags(query, projection, options)
    return planeToJSON(res, {
        data: tags
    })
});


module.exports = tagRoute;
