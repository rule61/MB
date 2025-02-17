"use server";

import * as z from "zod";

import { signIn } from "@/src/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/src/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { error } from "console";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.parse(values);

    if(!validatedFields){
        return{error: "Invalid fields!"};
    }

    const {email, password} = validatedFields;
    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password ){
        return{ error: "Email does not exists"}
    };
    
    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);
        
        return{success: "Confirmation email sent!"};
    }

    try{
        await signIn("credentials", {
            email, 
            password, 
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    }
    catch(error){
        if( error instanceof AuthError){
            switch (error.type){
                case "CredentialsSignin":
                    return {error: "Invalid credentials!"};
                default:
                    return {error: "Something went wrong!"};
            }
        }

        throw error;
    }
};