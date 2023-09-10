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
    console.log(req.body.userId)
    console.log(req.user._id)
    // const isAMember = await ProjectMember.find({user: req.body.userId})
    const members = await ProjectMember.create({project:req.body.projectId, user: req.body.userId})
//     if(isAMember){
// }
console.log(members.user)
res.json(members)
}
