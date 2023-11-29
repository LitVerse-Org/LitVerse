// /src/pages/api/userOperations/getBookmarkedPosts.js

import prisma from '/utilities/db';

export default async function getBookmarkedPosts(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).end(); // Method Not Allowed
    }

    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'Bad Request: User ID is required' });
    }

    try {
        const bookmarks = await prisma.bookmark.findMany({
            where: {
                userId: parseInt(userId, 10) // Ensure userId is an integer
            },
            include: {
                post: {
                    include: {
                        user: true,  // Include all fields from the user
                        likes: true, // Include all fields from the likes
                        tags: true   // Include all fields from the tags
                    }
                }
            }
        });

        const bookmarkedPosts = bookmarks.map(bookmark => bookmark.post);

        return res.status(200).json(bookmarkedPosts);
    } catch (error) {
        console.error('Error fetching bookmarked posts:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
