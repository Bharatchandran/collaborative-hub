const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const subtaskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    commit:{
        type:Schema.Types.ObjectId,
        ref: 'Commit',
        required : true
    },
   
}, {
    timestamps: true
})
module.exports = mongoose.model("Subtask", subtaskSchema);