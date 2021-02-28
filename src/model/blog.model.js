let mongoose = require('mongoose')
let Schema = mongoose.Schema;

var BlogSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        username: {
            type: String,
            require: true
        },
        fullname: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    published: {
        type: Number,
        default: 0
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    modifyAt: {
        type: Date,
        default: Date.now
    },
    publishedAt: {
        type: Date,
        require: false
    },
    publishedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: false
    },
    tags: [
        {
            type: String,
            require: true
        }
    ],
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            required: false
        }
    ]
})
module.exports = mongoose.model('Blog', BlogSchema)