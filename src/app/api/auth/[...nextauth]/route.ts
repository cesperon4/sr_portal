import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

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
          }
        );

        const response = await res.json();

        if (response.data) {
          const token = response.data.upsertUser.data.token;
          const { id, email, username, firstname, lastname, role } =
            response.data.upsertUser.data.user;

          Object.assign(user, {
            backendToken: token,
            id,
            email,
            username,
            firstname,
            lastname,
            role,
          });
        }
      } catch (err) {
        console.error("Error syncing user with backend:", err);
      }

      return true; // allow sign-in
    },
    async jwt({ token, user }) {
      if (user) {
        token.backendToken = user.backendToken;
        token.id = user.id;
        token.role = user.role;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.username = user.username;
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
