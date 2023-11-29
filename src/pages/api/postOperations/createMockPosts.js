import prisma from '/utilities/db';
import faker from 'faker';
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

  // Fetch all tag IDs
  const tags = await prisma.tag.findMany({
    select: {
      id: true,
    },
  });

  const userIds = users.map(user => user.id);
  const tagIds = tags.map(tag => tag.id);
  const numberOfPosts = 10; // Number of posts per user
  let createdCount = 0;
  let errors = [];

  for (const userId of userIds) {
    for (let i = 0; i < numberOfPosts; i++) {
      // Generate Markdown-formatted content
      const title = `# ${faker.lorem.sentence()}`;
      const body = `> ${faker.lorem.paragraph()}`;
      const bulletList = `- ${faker.lorem.words(3)}\n- ${faker.lorem.words(3)}\n- ${faker.lorem.words(3)}`;
      const content = `${title}\n\n${body}\n\n${bulletList}`;

      const randomTagIds = faker.helpers.shuffle(tagIds).slice(0, faker.random.number({ min: 1, max: 3 })); // Associate with 1 to 3 tags

      try {
        await prisma.post.create({
          data: {
            content,
            userId,
            mediaType: 'none',
            tags: {
              connect: randomTagIds.map(id => ({ id })),
            },
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
