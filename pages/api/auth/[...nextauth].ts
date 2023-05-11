// pages/api/auth/[...nextauth].ts

import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import prisma from '../../../lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;


const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};


// callBacks: {
//   async signIn({ user }) {
//     let isAllowedToSignIn = true
//     const allowedUser = [
//       'YOURGITHUBACCID',
//     ];
//     console.log(user);
//     if (allowedUser.includes(String(user.id))) {
//       isAllowedToSignIn = true
//     }
//     else {
//       isAllowedToSignIn = false
//     }
//     return isAllowedToSignIn
//   }
// },