const express = require('express');
const { User, ChangePassword, UpdateUser } = require('../controller/users');
const { verifyToken } = require('../utils/verifyToken');
const { upload } = require('../utils/upload');
const router = express.Router();

router
    // Get perticular user
    .get('/:username', User)
    // Change password
    .patch('/changepassword', verifyToken, ChangePassword)
    // Update profile
    .patch('/:username', upload.single('profile_img'), verifyToken, UpdateUser)

exports.router = router;