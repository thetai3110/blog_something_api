let mongoose = require('mongoose')
let Schema = mongoose.Schema;

var BlogSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
        type: Boolean,
        default: false
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
        default: Date.now
    },
    publishedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tag: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag'
        }
    ]
})
module.exports = mongoose.model('Blog', BlogSchema)