const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentSchema = new Schema({
    comment_body: {
        type: String,
        default: ""
    },
    book_id: {
        type: Schema.Types.ObjectId,
        ref: "Book"
    },

    user_id:{
        type:Schema.Types.ObjectId,
        ref: "User"
    },

    rating: {
        type: Number,
        required: true
    }
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment