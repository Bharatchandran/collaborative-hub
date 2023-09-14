const mongoose = require('mongoose')
const GroupMessage = require("../../models/groupmessage")
module.exports ={
    createMessage,
    getMessages
}

async function getMessages(req, res) {
    const projectId = mongoose.Types.ObjectId(req.params.id)
    console.log(projectId)
    const messages = await GroupMessage.find({project: projectId}).populate('user').sort('-createdAt')
    console.log(messages,"==")
    res.json(messages)
}

async function createMessage(req, res){
    console.log(req.body)
    const message = await GroupMessage.create({user:req.body.userId, project: req.body.projectId, message:req.body.newMessage})
    res.json(message)
}