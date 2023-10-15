import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { authOptions } from '../auth/[...nextauth]';

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  const userId = session.user.id;

  const followers = await prisma.follower.findMany({
    where: {
      userId: parseInt(userId, 10),
    },
    include: {
      follower: true,
    },
  });
//.
  const followerDetails = followers.map(f => f.follower);
  res.status(200).json(followerDetails);
}
