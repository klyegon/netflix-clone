import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prismadb from "@/lib/primadb"

const serverAuth = async (request: NextApiRequest) => {
    const session = await getSession({req: request});
    if (!session?.user?.email) {
        throw new Error("Not sign in")
    }

    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    if (!currentUser) {
        throw new Error("Not signed in");
    }

    return {currentUser}
}

export default serverAuth;