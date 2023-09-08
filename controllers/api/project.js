const Project = require('../../models/project');

module.exports = {
    getAllProjects,
    createProject
}

async function getAllProjects(req, res) {
    const projects = await Project.find({user: req.user._id}).sort('-createdAt').populate('user');
    res.json(projects)
}

async function createProject(req, res){
    const project = await Project.create({name:req.body.name, user: req.user._id})
    res.json(project)
}
