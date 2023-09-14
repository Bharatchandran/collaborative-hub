const express = require('express');
const router = express.Router();
const addMembersController = require('../../controllers/api/addmembers')

router.get('/:id/users', addMembersController.getAllUsers)
router.post('/addUser', addMembersController.addUser)

module.exports = router