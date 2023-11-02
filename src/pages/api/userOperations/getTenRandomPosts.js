// /Users/dobsondunavant/Documents/GitHub/LitVerse2/src/pages/api/userOperations/getTenRandomPosts.js

import prisma from '/utilities/db';

export default async function getTenRandomPosts(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).end(); // Method Not Allowed
    }

    try {
        // Fetch distinct user IDs
        const distinctUserIDs = await prisma.post.findMany({
            select: {
                userId: true
            },
            distinct: ['userId'],
            take: 10
        });

        // Fetch one post for each unique user ID
        const posts = await Promise.all(
            distinctUserIDs.map(async ({ userId }) => {
                return prisma.post.findFirst({
                    where: {
                        userId: userId
                    },
                    include: {
                        user: true,  // Include all fields from the user
                        likes: true, // Include all fields from the likes
                        tags: true   // Include all fields from the tags
                    }
                });
            })
        );

        // Filter out any null values in case some user IDs don't have associated posts
        const filteredPosts = posts.filter(Boolean);

        // Send the posts as a JSON response
        return res.status(200).json(filteredPosts);
    } catch (error) {
        console.error('Error fetching random posts:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
