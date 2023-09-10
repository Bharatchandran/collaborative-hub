const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/api/project')

router.get('/', projectController.getAllProjects)
router.get('/joined', projectController.getAllJoinedProjects)
router.post('/create', projectController.createProject)

module.exports = router