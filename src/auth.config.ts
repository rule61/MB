import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs"

export default { 
    providers: [
        Credentials({
            async authorize(credentials){
                console.log("Authorizing credentials:", credentials);
                const validatedFields = LoginSchema.safeParse(credentials);

                if(validatedFields.success){
                    const {email, password} = validatedFields.data;

                    const user = await getUserByEmail(email);
                    if(!user || !user.password){
                        console.log("User not found or password missing");
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password,
                    )
                    if(passwordMatch) {
                        console.log("Password match");
                        return user;
                    } else {
                        console.log("Password mismatch");
                    }
                } else {
                    console.log("Validation failed:", validatedFields.error);
                }

                return null;
            }
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),] 
} satisfies NextAuthConfig