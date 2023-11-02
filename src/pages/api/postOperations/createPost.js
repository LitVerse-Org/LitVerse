export default async function handler(req, res) {
	if (req.method !== 'POST') {
	  return res.status(405).end();
	}
  
	const { content, tagIds } = req.body;
	const userId = 1; // For example, you could fetch this from session
  
	try {
	  const newPost = await prisma.post.create({
		data: {
		  content,
		  userId,
		  tags: {
			connect: tagIds.map((id) => ({ id })),
		  },
		},
	  });
  
	  return res.status(201).json(newPost);
	} catch (error) {
	  return res.status(500).json({ error: 'Internal Server Error' });
	}
  }