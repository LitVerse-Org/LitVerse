import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function getFollowing(req, res) {
  const userId = req.query.userId;
  const userIdAsInt = parseInt(userId, 10);
  try {
    const following = await prisma.follower.findMany({
      where: { followerId: userIdAsInt },
      select: { user: { select: { username: true } } }
    });
    res.json({ following });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
