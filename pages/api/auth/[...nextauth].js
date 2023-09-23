import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID, // Your Facebook App ID
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET, // Your Facebook App Secret
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn(user, account, profile) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: user.email,
        },
      });

      if (existingUser) {
        return true;
      }

      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          // ... other fields you want to include
        },
      });

      return true;
    },
    async session(session, token) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
