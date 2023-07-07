import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/primadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method != "GET") return response.status(404).end();

  try {
    await serverAuth(request, response);
    const { movieId } = request.query;
    if (typeof movieId != "string") throw new Error("Invalid ID");
    if (!movieId) throw new Error("Invalid ID");
    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!movie) throw new Error("Invalid ID");
    return response.status(200).json(movie);
  } catch (error) {
    console.log(error);
    response.status(405).end();
  }
}
