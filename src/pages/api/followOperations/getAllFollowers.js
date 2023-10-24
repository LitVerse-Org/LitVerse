import { PrismaClient } from '@prisma/client';
import {getSession, useSession} from 'next-auth/react';
import { authOptions } from '../auth/[...nextauth]';
import {useEffect, useState} from "react";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { data: session } = useSession();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (session?.token?.sub) {
      setUserId(session.token.sub);
    }
  }, [session]);

  const followers = await prisma.follower.findMany({
    where: {
      userId: parseInt(userId, 10),
    },
    include: {
      follower: true,
    },
  });
//.
  const followerDetails = followers.map(f => f.follower);
  res.status(200).json(followerDetails);
}
