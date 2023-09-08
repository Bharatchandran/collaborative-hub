const Subtask = require('../../models/subtask');

module.exports = {
    getAllSubTasks,
    createSubTask
}

async function getAllSubTasks(req, res) {
    const subtasks = await Subtask.find({user:req.user._id, commit: req.params.id}).sort('-createdAt')
    res.json(subtasks)
    // const subtasks = await Subtask.find({user: req.user._id, commit: req.params.id}).sort('-createdAt').populate('user');
    // res.json(subtasks)
}

async function createSubTask(req, res){
    const subtask = await Subtask.create({task:req.body.task, commit: req.params.id})
    res.json(subtask)
}
