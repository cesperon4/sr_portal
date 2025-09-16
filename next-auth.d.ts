// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      email?: string | null;
      firstname?: string | null;
      lastname?: string | null;
      username?: string | null;
      role?: string | null;
      /** Add any custom fields you want available on client */
      backendToken?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id?: string;
    firstname?: string | null;
    lastname?: string | null;
    email?: string | null;
    username?: string | null;
    role?: string | null;
    backendToken?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    backendToken?: string | null;
    id?: string;
    role?: string | null;
  }
}
