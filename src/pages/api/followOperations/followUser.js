
import prisma from '/utilities/db';

export default async function followUser(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { userId, followerId } = req.body;

  if (!userId || !followerId) {
    return res.status(400).json({ error: 'userId and followerId are required' });
  }

  try {
    await prisma.follower.create({
      data: {
        userId,
        followerId,
      },
    });

    return res.status(201).json({ message: 'Successfully followed the user' });
  } catch (error) {
    console.error('Error following the user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
