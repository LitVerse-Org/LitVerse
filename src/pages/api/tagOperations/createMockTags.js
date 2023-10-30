import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function createMockTags(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const predefinedTags = ['food', 'apples', 'fall', 'travel', 'nature', 'sports', 'music', 'movies', 'tech', 'fashion'];
  let createdCount = 0;
  let errors = [];

  for (const name of predefinedTags) {
    try {
      await prisma.tag.create({
        data: {
          name,
        },
      });
      createdCount++;
    } catch (error) {
      errors.push(`Error for tag ${name}: ${error.message}`);
    }
  }

  res.status(errors.length === 0 ? 200 : 400).json({
    success: errors.length === 0,
    message: `Created ${createdCount} mock tags.`,
    errors: errors,
  });
}
