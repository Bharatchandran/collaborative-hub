const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const projectmemberSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
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
module.exports = mongoose.model("Projectmember", projectmemberSchema);