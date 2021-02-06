let mongoose = require('mongoose')
let Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: {
        type: String,
        max: 30,
        required: true
    },
    username: {
        type: String,
        max: 15,
        min: 5,
        unique: true,
        required: true
    },
    password: {
        type: String,
        max: 15,
        min: 5,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    posted:{
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
    }
})
module.exports = mongoose.model('User', UserSchema)