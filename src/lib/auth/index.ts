import User from "_/models/user";
import { connectToDB } from "_/utils/database";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session?.user?.email,
      });

      return {
        ...session,
        user: { ...session.user, id: sessionUser?._id.toString() },
      };
    },

    async signIn({ profile }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile?.email });

        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.picture,
          });
        }

        return true;
      } catch (error) {
        console.error("=> 'route.ts' Error connecting to database: ", error);
        return false;
      }
    },
  },
} satisfies NextAuthOptions;
