const express = require('express');
const {
  createPost,
  getPosts,
  likePost,
  deletePost,
} = require('../controllers/PostController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createPost);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Obtiene todas las publicaciones
 *     tags: [Publicaciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de publicaciones
 */
router.get('/', authMiddleware, getPosts);

router.post('/:id/like', authMiddleware, likePost);

router.delete('/:id', deletePost);

module.exports = router;
