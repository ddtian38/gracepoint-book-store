const mongoose = require("mongoose");
const Schema = mongoose.Schema
const findOrCreate = require("mongoose-find-or-create")

const bookSchema = new Schema ({
    title: {
        type: String,
        required: true
    },

    author :{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    quantity : {
        type: Number,
        required: true
    },

    image_url: {
        type: String,
        required: true
    },

    genre: {
        type: String,
        required: true
    },

    comment: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }

    ]
})

bookSchema.plugin(findOrCreate)

const Book = mongoose.model("Book", bookSchema)

module.exports = Book