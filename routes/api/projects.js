const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/api/project')

router.get('/', projectController.getAllProjects)
router.get('/:id/get', projectController.getProject)
router.get('/joined', projectController.getAllJoinedProjects)
router.post('/:id/edit', projectController.handleEditSubmit)
router.get('/:id/findMembers', projectController.getProjectMembers)
router.get('/:id', projectController.getProjectOwner)
router.post('/create', projectController.createProject)
router.post('/project/delete', projectController.handleDelete)

module.exports = router