const express = require('express');
const AuthController = require('../controllers/post');
// const get = require('../controllers/get');
const auth = require('../middlerawe/auth.js');

const router = express.Router();

router.post('/postLogin', AuthController.postLogin);
// router.get('/getLogin', auth, get.getLogin);

module.exports = router;