const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("Project", projectSchema);