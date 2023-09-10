const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const commitSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    push:{
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("Commit", commitSchema);