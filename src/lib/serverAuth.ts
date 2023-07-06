import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/primadb"
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";


const serverAuth = async (request: NextApiRequest, response: NextApiResponse) => {
    const session = await getServerSession(request, response,  authOptions);
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