const User = require('../../models/user')
const ProjectMember = require('../../models/projectmember')
module.exports = {
    addUser,
    getAllUsers,
}

async function getAllUsers(req, res) {
    console.log(req.params.id,"=")
    const members = await ProjectMember.find({project: req.params.id})
    const projectMembersId = members.map(member => member.user)
    const users = await User.find({_id :{ $nin: [...projectMembersId,req.user._id] } })  // finding all users  other than projectMember and current user
    res.json(users)
}

async function addUser(req, res){
    const userExist = await ProjectMember.findOne({project:req.body.projectId, user: req.body.userId})
    if (userExist) {
        res.json(userExist)
    } else {
        const members = await ProjectMember.create({project:req.body.projectId, user: req.body.userId})
        res.json(members)
    }
    
}
