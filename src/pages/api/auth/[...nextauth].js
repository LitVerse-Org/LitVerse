import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '/utilities/db';
import validator from "validator";
import bcrypt from "bcrypt";

export default NextAuth({
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                const { email, password } = credentials;

                if (!validator.isEmail(email)) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                });

                if (user && await bcrypt.compare(password, user.password)) {
                    //console.log("inside `authorize async(credentials)` callback - Valid credentials, user variable assigned to `prisma.user.findUnique where: email`: ", user)
                    return { id: user.id, email: user.email, username: user.username };

                } else {
                    console.log("Invalid credentials")
                    return null;
                }
            }
        }),
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn(user, account, profile) {
            console.log("signIn callback triggered in [...nextauth].js");
            //console.log("SignIn User:", { user, account, profile });
            if (account && account.provider === 'credentials') {
                if (user && user.id && user.email && user.username) {
                    console.log("Valid sign in for: ", user);
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        },
        async session(session, token) {
            console.log("session callback triggered in [...nextauth].js");
            if (token?.sub) {
                session.user.id = token.sub;  // The standard 'sub' field
                session.user.userID = token.sub;  // Your custom 'userID' field
            }
            if (token?.email) {
                session.user.email = token.email;
            }
            if (token?.username) {
                session.user.username = token.username;
            }
            //console.log("`[...nextauth].js` - Session token:", session);
            console.log("Session token successfully created in [...nextauth.js]: ", session);
            return session;
        },
    },
});
