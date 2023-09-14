const User = require('../../models/user')
const Project = require('../../models/project');
const ProjectMember = require('../../models/projectmember');
const Commit = require('../../models/commit');
const Subtask = require('../../models/subtask');
module.exports = {
    getAllProjects,
    createProject,
    getAllJoinedProjects,
    getProjectOwner,
    getProjectMembers,
    getProject,
    handleDelete,
    handleEditSubmit
}

async function getAllProjects(req, res) {
    const projects = await Project.find({user: req.user._id}).sort('-createdAt').populate('user');
    console.log(projects,"ping")
    res.json(projects)
}

async function createProject(req, res){
    const project = await Project.create({name:req.body.name, user: req.user._id, description: req.body.description})
    const members = await ProjectMember.create({project:project._id, user: req.user._id})
    res.json(project)
}

async function getAllJoinedProjects(req,res){
    let projects = await ProjectMember.find({user: req.user._id}).populate('project').populate('user').sort('-createdAt')
    projects = projects.map(project => project.project)
    console.log(projects,"-----")
    res.json(projects)
    // let projects = await ProjectMember.find({})
    //  projects = projects.map(project => project.project)
    // res.json(projects)
}

async function getProjectOwner(req, res){
    const owner = await User.findOne({_id:req.params.id})
    res.json(owner)
}

async function getProjectMembers(req, res) {
    
    const members = await ProjectMember.find({project: req.params.id}).populate('user')
    console.log(members)
    res.json(members)
}

async function getProject(req, res) {
    const project = await Project.findOne({_id: req.params.id})
    res.json(project)
}

async function handleDelete(req, res) {
    const projectMember = await ProjectMember.deleteOne({project: req.body.projectId, user: req.user._id})
    console.log(projectMember, "tttttt")
    const project = await Project.deleteOne({_id: req.body.projectId})
    commitIds = await Commit.find({project: req.body.projectId})
    const commit = await Commit.deleteMany({project: req.body.projectId})
    const subtask = await Subtask.deleteMany({commit: [...commitIds]})
    res.json(project)
}

async function handleEditSubmit(req, res) {
    const project = await Project.findOne({_id: req.body.projectId})
    project.name = req.body.editProject
    project.description = req.body.editDescription
    await project.save()
    console.log("Helloooooooo")
    res.json(project)
}