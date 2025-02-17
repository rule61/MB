import { db } from "@/src/lib/db";

export const getUserByEmail = async (email: string) => {
    return await db.user.findUnique({
        where: { email },
        select: {
            id: true,
            email: true,
            password: true, // Ensure password is selected
            name: true,
            username: true,
            emailVerified: true,
            image: true,
            accounts: true, // Ensure accounts are selected
        },
    });
};

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                username: true,
                emailVerified: true,
                image: true,
                role: true,  // Ensure role is selected
            },
        });
        return user; // You forgot this return statement
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return null;
    }
};