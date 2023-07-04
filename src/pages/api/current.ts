import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

export default async function handler (request: NextApiRequest, response: NextApiResponse) {
    if (request.method != "GET") {
        return response.status(405).end();
    }

    try {
        const { currentUser } = await serverAuth(request);
        return response.status(200).json(currentUser);
    } catch (error) {
        console.log(error);
        return response.status(404).end();
    }
}