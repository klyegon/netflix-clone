import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/primadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method != "GET") return response.status(405).end();

  try {
    const { currentUser } = await serverAuth(request, response);
    const favMovie = await prismadb.movie.findMany({
      where: { 
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });
    return response.status(200).json(favMovie);
  } catch (error) {
    console.log(error);
    return response.status(400).end();
  }
}
