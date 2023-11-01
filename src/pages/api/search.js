import { PrismaClient } from '@prisma/client';
import{ Post, User } from '@prisma-client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { searchQuery } = req.query;
  try {
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    res.status(200).json({ posts, users, hashtags });
} catch (error) {
  res.status(500).json({ error: 'Internal Server Error' });
}
}
