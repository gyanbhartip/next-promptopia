import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id?: string | null;
    };
    expires: ISODateString;
  }
  interface Profile {
    sub?: string;
    name?: string;
    email?: string;
    picture?: string;
  }
}
