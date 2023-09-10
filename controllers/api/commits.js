const Commit = require('../../models/commit');

module.exports = {
    getAllCommits,
    createCommit,
    pushCommit
}

async function getAllCommits(req, res) {
    const projects = await Commit.find({ project:req.params.id}).sort('-createdAt').populate('user');
   
    res.json(projects)
}

async function createCommit(req, res){
    const project = await Commit.create({name:req.body.name, user: req.user._id, project: req.params.id})
    res.json(project)
}

async function pushCommit(req, res) {
    const commit = await Commit.findOne({_id: req.body.commitId, user: req.body.userId })
    commit.push = true
    await commit.save()
console.log("success")
    res.json(commit)
}