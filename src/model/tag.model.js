let mongoose = require('mongoose')
let Schema = mongoose.Schema;

var TagSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tagName: {
        type: String,
        required: true
    }
})
TagSchema.path('tagName').set((inputString) => {
    return inputString[0].toUpperCase() + inputString.slice(1);
})
module.exports = mongoose.model('Tag', TagSchema)