import User from "_/models/user";
import { connectToDB } from "_/utils/database";
import type { NextAuthConfig, Profile, Session } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      const sessionUser = await User.findOne({
        email: session?.user?.email,
      });

      return {
        ...session,
        user: { ...session.user, id: sessionUser?._id.toString() },
      };
    },

    async signIn({ profile }: { profile?: Profile }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile?.email });

        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: typeof profile?.picture === "string" ? profile.picture : "",
          });
        }

        return true;
      } catch (error) {
        console.error("=> 'route.ts' Error connecting to database: ", error);
        return false;
      }
    },
  },
} satisfies NextAuthConfig;

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
