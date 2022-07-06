import { query as q } from "faunadb";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { client } from "../../../services/fauna";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: "read:user",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await client.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index("user_by_email"),
                  q.Casefold(user.email as string)
                )
              )
            ),
            q.Create(q.Collection("users"), {
              data: {
                email: user.email,
                name: user.name,
              },
            }),
            q.Get(
              q.Match(
                q.Index("user_by_email"),
                q.Casefold(user.email as string)
              )
            )
          )
        );

        return true;
      } catch (error: any) {
        console.log(error.message);

        return false;
      }
    },
  },
});
