import prisma from '/utilities/db';

export default async function handle(req, res) {
  console.log("Received request", req.method, req.query); // Log the incoming request method and query

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  console.log("Searching for user with ID:", userId); // Log the userId being searched for

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId)
      },
      select: {
        id: true,
        email: true,
        username: true,
        phone: true,
        bio: true,
        comments: true,
        profileImgS3URL: true,
        coverImgS3URL: true,
        backgroundImgS3URL: true,
        posts: {
          select: {
            id: true,
            content: true,
            // ... other post fields
          }
        },
        followedBy: {
          select: {
            id: true,
            // ... other follower fields
          }
        },
        following: {
          select: {
            id: true,
            // ... other following fields
          }
        },
        // ... add other fields and relations as needed
      }
    });

    if (!user) {
      console.log("User not found"); // Log if the user is not found
      return res.status(404).json({ error: 'User not found' });
    }

    const userWithPostCount = {
      ...user,
      postsCount: user.posts.length
    };

    // Return the user object with the post count
    return res.status(200).json(userWithPostCount);

  } catch (error) {
    console.log("Error:", error); // Log any other errors
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}