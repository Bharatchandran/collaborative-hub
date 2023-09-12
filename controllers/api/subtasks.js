const Subtask = require('../../models/subtask');

module.exports = {
    getAllSubTasks,
    createSubTask,
    handleCompleteTask
}

async function getAllSubTasks(req, res) {
    const subtasks = await Subtask.find({user:req.user._id, commit: req.params.id}).sort('-createdAt')
    res.json(subtasks)
}

async function createSubTask(req, res){
    const subtask = await Subtask.create({task:req.body.task, commit: req.params.id})
    res.json(subtask)
}

async function handleCompleteTask(req, res) {
    const subtask = await Subtask.findOne({_id: req.body.subtaskId})
    subtask.completed = true
    await subtask.save()
    res.json(subtask)
}