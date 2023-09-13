const express = require('express');
const router = express.Router();
const commitController = require('../../controllers/api/commits')

router.get('/:id', commitController.getAllCommits)
router.get('/:id/get', commitController.getCommit)
router.post('/:id/create', commitController.createCommit)
router.post('/:id/edit', commitController.handleEditSubmit)
router.post('/commit/delete', commitController.handleDelete)
router.get('/:id/findPulledUsers', commitController.getAllPulledUsers)
router.post('/push', commitController.pushCommit)
router.post('/pull', commitController.pullCommit)
router.post('/pushed/find', commitController.findPushed)
router.post('/pull/find', commitController.findPull)

module.exports = router