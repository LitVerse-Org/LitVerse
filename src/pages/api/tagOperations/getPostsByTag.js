import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { tag } = req.query;

  if (!tag || typeof tag !== 'string') {
    return res.status(400).json({ error: 'Invalid tag name' });
  }

  try {
    const posts = await prisma.post.findMany({
      where: {
        tags: {
          some: {
            name: {
              equals: tag,
            },
          },
        },
      },
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts by tag:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
