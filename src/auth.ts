import NextAuth, { type DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "@/data/user"
import authConfig from "./auth.config"
import { UserRole } from "@prisma/client"


export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  
  events: {
    async linkAccount({user}){
      await db.user.update({
        where: {id: user.id},
        data: {emailVerified: new Date()}
      })
    }
  },
  
  callbacks: {
      async signIn({ user, account }){
        // Allow OAuth(Google, GitHub) without verification email
        if (account?.provider !== "credentials") return true;

        if (!user.id) {
          console.error("User ID is undefined");
          return false; // or handle the case where user.id is undefined
        }

        const existingUser = await getUserById(user.id);

        if(!existingUser?.emailVerified) return false;
        return true;
      },

      async session({token, session}){
        if(token.sub && session.user){
          session.user.id = token.sub;
        }
        
        if(token.sub && session.user){
          session.user.role = token.role as UserRole;
        }

        return session;
      },
      async jwt({token}){
        if(!token.sub) return token;

        const existingUser = await getUserById(token.sub);

        if(!existingUser) return token;

        token.role = existingUser.role;

        return token;
      }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },  
    ...authConfig,
})