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
    console.log([...projectMembersId, req.user._id])
    const users = await User.find({_id :{ $nin: [...projectMembersId,req.user._id] } })
        res.json(users)
}

async function addUser(req, res){
    const userExist = await ProjectMember.findOne({project:req.body.projectId, user: req.body.userId})
    if (userExist) {
        console.log("member exist")
        res.json(userExist)
    } else {
        const members = await ProjectMember.create({project:req.body.projectId, user: req.body.userId})
        console.log("member dont exist")
        res.json(members)
    }
    
}
