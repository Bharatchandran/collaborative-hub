const Commit = require('../../models/commit');
const PullCommit = require('../../models/pullcommit')
module.exports = {
    getAllCommits,
    createCommit,
    pushCommit,
    pullCommit,
    findPushed,
    findPull,
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
    const pull = await PullCommit.create({commit: req.body.commitId, user: req.body.userId, pull: true })
    const comparePush = await Commit.findOne({_id : req.body.commitId})
    const pushed = await Commit.find({createdAt: { $lt : comparePush.createdAt}})
    pushed.forEach(async (el) => {
        await PullCommit.create({commit: el._id, user: req.body.userId, pull: true })
    })

    console.log(pushed)
console.log("pull")
    res.json(pull)
} 

async function findPushed(req, res) {
    const pushed = await Commit.findOne({_id: req.body.commitId, user: req.body.userId})
    console.log(req.body.commitId)
    console.log(pushed,"=====")
    // await pull.save()
    res.json(pushed)
}

async function findPull(req, res) {
    const pull = await PullCommit.findOne({commit: req.body.commitId, user: req.body.userId})
    
    // console.log(pull,"++++++")
    
    // await pull.save()
    res.json(pull)
}

