import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prismadb from "@/app/libs/prismadb";

export async function getSession() {
    return await getServerSession(authOptions);
}


export default async function getCurrentUser() {
    try {
        const session = await getSession();
        if (!session?.user?.email) return null;

        const currentUser = await prismadb.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });
        if(!currentUser) return null;

        return {
            ...currentUser,
            emailVerified: currentUser.emailVerified?.toISOString() || null,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt:currentUser.createdAt.toISOString(),
        };

    } catch (error: any) {
        return null
    }
}