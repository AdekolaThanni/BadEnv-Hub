// pages/api/auth/[...nextauth].ts
//@ts-nocheck
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter"
import { NextApiRequest, NextApiResponse } from "next";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = {
          id: 1,
          name: "Admin",
          email: "badenvironmentclub@gmail.com",
        };

        if (
          credentials &&
          credentials.email === "badenvironmentclub@gmail.com" &&
          credentials.password === "123456"
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0"
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return user ? true : false; // Return true if user object exists
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/";
    },
    async jwt({ token, account, profile }) {
      // Initial sign in
      if (account && account.provider === "twitter" && profile) {
        token.id = profile.data.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add properties to the session object
      session.user.id = token.id;
      return session;
    },

  },
});
