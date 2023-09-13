const commit = require('../../models/commit');
const Commit = require('../../models/commit');
const PullCommit = require('../../models/pullcommit')
module.exports = {
    getAllCommits,
    createCommit,
    pushCommit,
    pullCommit,
    findPushed,
    findPull,
    getAllPulledUsers,
    handleEditSubmit,
    getCommit,
    handleDelete
}

async function getAllCommits(req, res) {
    const projects = await Commit.find({ project:req.params.id}).sort('-createdAt').populate('user');
    const filteredProjectsPushTrue = projects.filter((project) => project.push === true).sort((a,b)=> b.updatedAt - a.updatedAt)
    const filteredProjectsPushFalse = projects.filter((project) => project.push === false)
    const filteredProjects = [...filteredProjectsPushFalse, ...filteredProjectsPushTrue]
    res.json(filteredProjects)
}

async function createCommit(req, res){
    const project = await Commit.create({name:req.body.name, user: req.user._id, project: req.params.id})
    res.json(project)
}

async function pushCommit(req, res) {
    const commit = await Commit.findOne({_id: req.body.commitId, user: req.body.userId })
    commit.push = true
    await commit.save()
    res.json(commit)
}

async function pullCommit(req, res) {
    // const pull = await PullCommit.create({commit: req.body.commitId, user: req.body.userId, pull: true })
    // const comparePush = await Commit.findOne({_id : req.body.commitId})
    // const pushed = await Commit.find({updatedAt: { $lt : comparePush.updatedAt}})
    // pushed.forEach(async (el) => {
    //     await PullCommit.create({commit: el._id, user: req.body.userId, pull: true })
    // })
    // , user: {$ne: req.user._id}
    const pull = await Commit.findOne({push: true,  user: {$ne: req.user._id}}).sort('-updatedAt')
    console.log(pull,"===")
    console.log(pull,"++++++")
    const comparePush = await Commit.findOne({_id : pull._id})
    const pushed = await Commit.find({updatedAt: { $lte : comparePush.updatedAt}})
    pushed.forEach(async (el) => {
        await PullCommit.create({commit: el._id, user: req.user._id, pull: true })
    })
    res.json(pull)
} 

async function findPushed(req, res) {
    const pushed = await Commit.findOne({_id: req.body.commitId, user: req.body.userId})
    res.json(pushed)
}

async function findPull(req, res) {
    const pull = await PullCommit.findOne({commit: req.body.commitId, user: req.body.userId})
    res.json(pull)
}

async function getAllPulledUsers(req, res) {
    const pulledUsers = await PullCommit.find({commit: req.params.id}).populate('user')
    console.log(pulledUsers)
    res.json(pulledUsers)
}

async function handleEditSubmit(req, res) {
    const commit = await Commit.findOne({_id: req.body.commitId})
    commit.name = req.body.editCommit
    await commit.save()
    res.json(commit)
}

async function getCommit(req, res) {
    const commit = await Commit.findOne({_id: req.params.id})
    res.json(commit)
}


async function handleDelete(req, res) {
    const commit = await Commit.deleteOne({_id: req.body.commitId})
    res.json(commit)
}