import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getLikesForPost(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { postId } = req.query;

  if (!postId) {
    return res.status(400).json({ error: 'Post ID is required' });
  }

  try {
    const likes = await prisma.like.findMany({
      where: {
        postId: parseInt(postId, 10),
      },
      select: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    const usersWhoLiked = likes.map((like) => like.user);
    return res.status(200).json(usersWhoLiked);
  } catch (error) {
    console.error('Error fetching likes:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
