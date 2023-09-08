const Commit = require('../../models/commit');

module.exports = {
    getAllCommits,
    createCommit
}

async function getAllCommits(req, res) {
    const projects = await Commit.find({user: req.user._id, project:req.params.id}).sort('-createdAt').populate('user');
    console.log(req.params)
    console.log(req.body)
    res.json(projects)
}

async function createCommit(req, res){
    const project = await Commit.create({name:req.body.name, user: req.user._id, project: req.params.id})
    console.log(req.params.id,"==")
    res.json(project)
}
