import { PrismaClient } from '@prisma/client';
import faker from 'faker';

const prisma = new PrismaClient();

export default async function createMockPosts(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  // Fetch all user IDs
  const users = await prisma.user.findMany({
    select: {
      id: true,
    },
  });

  const userIds = users.map(user => user.id);
  const numberOfPosts = 10; // Number of posts per user
  let createdCount = 0;
  let errors = [];

  for (const userId of userIds) {
    for (let i = 0; i < numberOfPosts; i++) {
      const content = faker.lorem.paragraph();

      try {
        await prisma.post.create({
          data: {
            content,
            userId,
            mediaType: 'none',
          },
        });
        createdCount++;
      } catch (error) {
        errors.push(`Error for post ${i + 1} for user ${userId}: ${error.message}`);
      }
    }
  }

  res.status(errors.length === 0 ? 200 : 400).json({
    success: errors.length === 0,
    message: `Created ${createdCount} mock posts.`,
    errors: errors,
  });
}
