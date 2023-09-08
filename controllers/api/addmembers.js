const User = require('../../models/user')
const ProjectMember = require('../../models/projectmember')
module.exports = {
    addUser,
    getAllUsers,
    
}

async function getAllUsers(req, res) {
    const users = await User.find({})
    console.log(users,"===")
    res.json(users)
}

async function addUser(req, res){
    const members = await ProjectMember.create({project:req.body.projectId, user: req.user._id})
    res.json(members)
}
