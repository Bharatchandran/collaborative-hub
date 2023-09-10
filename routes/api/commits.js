const express = require('express');
const router = express.Router();
const commitController = require('../../controllers/api/commits')

router.get('/:id', commitController.getAllCommits)
router.post('/:id/create', commitController.createCommit)
router.post('/push', commitController.pushCommit)

module.exports = router