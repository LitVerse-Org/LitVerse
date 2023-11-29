// /src/pages/api/userOperations/getUserPosts.js

import prisma from '/utilities/db';

export default async function getUserPosts(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Bad Request: User ID is required' });
  }

  try {
    const userPosts = await prisma.post.findMany({
      where: {
        userId: parseInt(userId, 10) // Ensure userId is an integer
      },
      include: {
        user: true,  // Include all fields from the user
        likes: true, // Include all fields from the likes
        tags: true   // Include all fields from the tags
      }
    });

    return res.status(200).json(userPosts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
