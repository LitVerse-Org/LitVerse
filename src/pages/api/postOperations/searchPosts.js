import prisma from '/utilities/db';


export default async function searchPosts(req, res) {


  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { query } = req.query;
 
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {

    const posts = await prisma.post.findMany({
      where: {
        content:{
          contains: query,
          mode: "insensitive",
        },
      },
      include:{
        user: true,
      },
      
      take:50,


    });

    return res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

//get user posts by using the url paramater -> ex: /api/getUserPosts?uid=<uidtosearch>
