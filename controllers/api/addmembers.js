const User = require('../../models/user')
const ProjectMember = require('../../models/projectmember')
module.exports = {
    addUser,
    getAllUsers,
}

async function getAllUsers(req, res) {
    const users = await User.find({_id :{ $ne: req.user._id } })
    res.json(users)
}

async function addUser(req, res){
    const members = await ProjectMember.create({project:req.body.projectId, user: req.body.userId})
    res.json(members)
}
