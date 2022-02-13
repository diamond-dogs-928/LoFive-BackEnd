const mongoose = require('../db/connection')

const noteSchema = new mongoose.Schema({

    owner: {type: String, required: true},
    post: {type: String, default: ""},
    likes: {type: Number, default: 0},
    comments: [
        {
        owner: {type: String},
        comment: {type: String},
        },
    ],
    tags: [{type: String}]

}, { timestamps: true })

const Note = mongoose.model('Note', noteSchema)

module.exports = Note