const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const groupmessageSchema = new Schema({
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
    message:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("Groupmessage", groupmessageSchema);