const express = require('express');
const { verifyToken } = require('../utils/verifyToken');
const { Search } = require('../controller/util');
const router = express.Router();

router
    .get('/search/:text', Search)

exports.router = router;