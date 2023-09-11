const express = require('express');
const router = express.Router();
const subtaskController = require('../../controllers/api/subtasks')

router.get('/:id', subtaskController.getAllSubTasks)
router.post('/:id/create', subtaskController.createSubTask)
router.post('/findSubtask', subtaskController.handleCompleteTask)

module.exports = router
