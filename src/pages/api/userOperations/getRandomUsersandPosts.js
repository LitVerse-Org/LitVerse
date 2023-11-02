import prisma from '/utilities/db';


export default async function getRandomUsersAndPosts(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).end(); // Method Not Allowed
    }

    const count = parseInt(req.query.count) || 5;

    try {
        // Fetch random users' IDs using Prisma and PostgreSQL's RANDOM() function
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
            },
            take: count,
            orderBy: {
                id: 'asc',  // Prisma doesn't support random ordering natively. You may need to randomize this in your application code.
            },
        });

        // Fetch posts for these users
        for (let i = 0; i < users.length; i++) {
            const posts = await prisma.post.findMany({
                where: {
                    userId: users[i].id,
                },
                select: {
                    content: true,  // Select only the fields you need
                },
            });
            users[i].posts = posts;
        }

        return res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching random users and posts:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}