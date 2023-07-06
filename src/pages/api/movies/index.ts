import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/primadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method != "GET") return response.status(405).end()

    try {
        await serverAuth(request);
        const movies = await prismadb.movie.findMany();
        return response.status(200).json(movies);
    } catch (error) {
        console.log(error);
        return response.status(404).end()
    }
}