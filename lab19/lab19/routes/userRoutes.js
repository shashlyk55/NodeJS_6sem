const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const Post = require('../models/Post')
const checkLoginMiddleware = require('../middleware/checkLoginMiddleware')

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

router.get('/profile', checkLoginMiddleware, userController.profile);

module.exports = router;

