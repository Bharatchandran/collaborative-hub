const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const pullcommitSchema = new Schema({
    commit: {
        type: Schema.Types.ObjectId,
        ref: "Commit",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    pull: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})
module.exports = mongoose.model("Pullcommit", pullcommitSchema);