import type { User } from "next-auth";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const mutation = `
        mutation {
          upsertUser(data: {
            firstname: "${user.name?.split(" ")[0] || ""}",
            lastname: "${user.name?.split(" ")[1] || ""}",
            email: "${user.email}"
          }) {
            data {
              token
              refreshToken
              user{
                  id
                  email
                  username
                  firstname
                  lastname
                  role
              }
            }
            message
            status
          }
        }
      `;

        const res = await fetch(
          process.env.NEXT_PUBLIC_NODE_ENV === "development"
            ? process.env.API_DEV_URL!
            : process.env.API_PROD_URL!,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: mutation }),
          },
        );

        const response = await res.json();

        if (response.data) {
          const data = response.data.upsertUser.data;
          console.log("data response from upsertUser", data);
          const token = data.token;
          const refreshToken = data.refreshToken; // Backend must return this for OAuth
          const { id, email, username, firstname, lastname, role } = data.user;

          console.log("[NextAuth signIn] upsertUser response:", {
            hasToken: !!token,
            hasRefreshToken: !!refreshToken,
            refreshTokenField: refreshToken ?? "(missing)",
          });

          Object.assign(user, {
            backendToken: token,
            refreshToken,
            id,
            email,
            username,
            firstname,
            lastname,
            role,
          });
        } else {
          console.log(
            "[NextAuth signIn] no response.data:",
            response.errors ?? response,
          );
        }
      } catch (err) {
        console.error("Error syncing user with backend:", err);
      }

      return true; // allow sign-in
    },
    async jwt({ token, user }) {
      if (user) {
        const typedUser = user as User;
        token.backendToken = typedUser.backendToken;
        token.refreshToken = typedUser.refreshToken ?? null;
        token.id = typedUser.id;
        token.role = typedUser.role;
        token.firstname = typedUser.firstname;
        token.lastname = typedUser.lastname;
        token.username = typedUser.username;
        console.log(
          "[NextAuth jwt] stored refreshToken in token:",
          !!token.refreshToken,
        );
      }
      return token;
    },
    async session({ session, token }) {
      const user = session.user!; // non-null assertion

      user.backendToken = token.backendToken ?? null;
      user.id = token.id ?? null;
      user.role = token.role ?? null;
      user.firstname = token.firstname ?? null;
      user.lastname = token.lastname ?? null;
      user.username = token.username ?? null;

      return session;
    },
    //params {url, baseUrl}
    async redirect() {
      // always redirect to dashboard
      return "/dashboard"; // or `${baseUrl}/dashboard`
    },
  },
});

export { handler as GET, handler as POST };
