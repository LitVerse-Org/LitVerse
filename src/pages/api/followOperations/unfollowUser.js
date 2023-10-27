import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function unfollowUser(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { userId, followerId } = req.body;

  if (!userId || !followerId) {
    return res.status(400).json({ error: 'userId and followerId are required' });
  }

  try {
    await prisma.follower.deleteMany({
      where: {
        userId,
        followerId,
      },
    });

    return res.status(200).json({ message: 'Successfully unfollowed the user' });
  } catch (error) {
    console.error('Error unfollowing the user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
