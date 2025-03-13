const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.userId;

    if (!content || content.trim() === '') {
      return res
        .status(400)
        .json({ message: 'El contenido no puede estar vacío' });
    }

    const newPost = await prisma.post.create({
      data: {
        content,
        userId,
      },
      include: { user: { select: { name: true } } },
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear publicación', error });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener publicaciones', error });
  }
};

const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { likes: { increment: 1 } },
    });

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error al dar like a la publicación' });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.post.delete({ where: { id: parseInt(id) } });

    res.json({ message: 'Publicación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la publicación' });
  }
};

module.exports = { createPost, getPosts, likePost, deletePost };
