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
    async session({ session }) {
      try {
        const useActiveSubscription = await client.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select(
                  'ref',
                  q.Get(
                    q.Match(
                      q.Index('user_by_email'),
                      q.Casefold(session.user?.email as string)
                    )
                  )
                )
              ),
              q.Match(
                q.Index('subscription_by_status'),
                "active"
              )
            ])
          )
        )

        return {
          ...session, activeSubscription: useActiveSubscription
        }
      } catch {
        return {
          ...session, activeSubscription: null
        }
      }
    },

    async signIn({ user }) {
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
