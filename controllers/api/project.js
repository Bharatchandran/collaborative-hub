const Project = require('../../models/project');
const ProjectMember = require('../../models/projectmember')
module.exports = {
    getAllProjects,
    createProject,
    getAllJoinedProjects
}

async function getAllProjects(req, res) {
    const projects = await Project.find({user: req.user._id}).sort('-createdAt').populate('user');
    res.json(projects)
}

async function createProject(req, res){
    const project = await Project.create({name:req.body.name, user: req.user._id})
    const members = await ProjectMember.create({project:project._id, user: req.user._id})
    res.json(project)
}

async function getAllJoinedProjects(req,res){
    let projects = await ProjectMember.find({user: req.user._id}).populate('project').populate('user')
    projects = projects.map(project => project.project)
    console.log(projects,"===+++")
    res.json(projects)
}