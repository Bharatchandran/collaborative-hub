const express = require('express');
const router = express.Router();
const groupmessageController = require('../../controllers/api/groupmessage')

router.get('/:id', groupmessageController.getMessages)
router.post('/message', groupmessageController.createMessage)

module.exports = router
