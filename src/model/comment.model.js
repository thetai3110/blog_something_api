let mongoose = require('mongoose')
let Schema = mongoose.Schema;

var CommentSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    modifyAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Comment', CommentSchema)