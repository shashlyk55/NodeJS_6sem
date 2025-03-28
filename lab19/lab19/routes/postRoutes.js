const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const checkLoginMiddleware = require('../middleware/checkLoginMiddleware')

router.post('/create', checkLoginMiddleware, PostController.write);
router.post('/delete/:id', checkLoginMiddleware, PostController.delete);
router.post('/update/:id', checkLoginMiddleware, PostController.update)

router.get('/update/:id', async (req, res) => res.status(200).render('update', { post: await PostController.get(req.params.id) }))

module.exports = router;