import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getUserPosts(req, res) {
  console.log("Received UID:", req.query.uid);  // Debugging line

  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { uid } = req.query;

  if (!uid) {
    return res.status(400).json({ error: 'UID is required' });
  }

  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: parseInt(uid, 10),
      },
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

//get user posts by using the url paramater -> ex: /api/getUserPosts?uid=<uidtosearch>
