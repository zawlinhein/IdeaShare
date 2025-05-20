import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID } from "@/sanity/lib/query";
import { writeClient } from "./sanity/lib/writeClient";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub],

  callbacks: {
    async signIn({
      user: { name, email, image },
      profile: { id, login, bio },
    }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID, {
          id,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          email,
          image,
          username: login,
          bio: bio || "",
        });
      }
      return true;
    },
    async jwt({ token, profile, account }) {
      if (profile && account) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID, { id: profile?.id });
        token.id = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
