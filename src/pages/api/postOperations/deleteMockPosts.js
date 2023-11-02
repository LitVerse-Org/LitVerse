import prisma from '/utilities/db';
export default async function deleteMockPosts(req, res) {
    const dateLimit = new Date("2023-10-31T18:32:33.784Z"); // Change this to the date before which you want to delete posts

    try {
        await prisma.post.deleteMany({
            where: {
                createdAt: {
                    lt: dateLimit
                },
            },
        });
        console.log(`Deleted posts created before ${dateLimit}`);
        res.status(200).json({ message: `Deleted posts created before ${dateLimit}` });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'An error occurred while deleting posts.' });
    } finally {
        await prisma.$disconnect();
    }
}
