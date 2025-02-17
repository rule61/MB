"use server";

import { db } from "@/src/lib/db";
import bcrypt from "bcryptjs";
import * as z from "zod";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/src/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.parse(values);

    if(!validatedFields){
        return{error: "Invalid fields!"};
    }

    const { email, password, name } = validatedFields;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);
    if(existingUser){
        return {error: "User already exists!"};
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });

    //Send verification token email
    const verificationToken = await generateVerificationToken(email);


    return{success: "Confirmation email sent!"};
};