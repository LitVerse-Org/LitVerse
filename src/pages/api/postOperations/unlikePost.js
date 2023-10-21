import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function unlikePost(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { userId, postId } = req.body;

  if (!userId || !postId) {
    return res.status(400).json({ error: 'userId and postId are required' });
  }

  try {
    await prisma.like.deleteMany({
      where: {
        userId,
        postId,
      },
    });

    return res.status(200).json({ message: 'Successfully unliked the post' });
  } catch (error) {
    console.error('Error unliking the post:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
