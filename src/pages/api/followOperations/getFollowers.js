import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function getFollowers(req, res) {
  const userId = req.query.userId;
  const userIdAsInt = parseInt(userId, 10);
  try {
    const followers = await prisma.follower.findMany({
      where: { userId: userIdAsInt },
      select: { follower: { select: { username: true } } }
    });
    res.json({ followers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
