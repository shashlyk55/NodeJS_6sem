const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    publisher: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post