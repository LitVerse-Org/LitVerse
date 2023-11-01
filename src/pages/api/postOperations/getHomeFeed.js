import prisma from '/utilities/db';
import { getSession } from 'next-auth/react';
export default async function handle(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  // get the list of people the user is following
  const userId = parseInt(session.user.id, 10);
  const following = await prisma.follower.findMany({
    where: {
      followerId: userId,
    },
    select: {
      userId: true,
    },
  });

  const followingIds = following.map(f => f.userId);

  // get the posts from the people the user is following.
  const posts = await prisma.post.findMany({
    where: {
      userId: {
        in: followingIds,
      },
    },
    include: {
      user: true,
    },
    orderBy: {
      id: 'desc', // Most recent posts first
    },
  });

  res.status(200).json(posts);
}
