import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function isFollowing(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { userId, followerId } = req.query;

  if (!userId || !followerId) {
    return res.status(400).json({ error: 'userId and followerId are required' });
  }

  try {
    const followingStatus = await prisma.follower.findFirst({
      where: {
        userId: Number(userId),
        followerId: Number(followerId)
      }
    });

    return res.status(200).json({ isFollowing: Boolean(followingStatus) });
  } catch (error) {
    console.error('Error checking follow status:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
