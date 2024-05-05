const { Schema, model } = require("mongoose");


const Post = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "user_Model",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    }
},{timestamps: true})

const Post_Schema = model("Posts",Post);

module.exports = {Post_Schema}