import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import prismadb from "@/lib/primadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {

  try {
    if (request.method === "POST") {
      const { currentUser } = await serverAuth(request, response);
      const { movieId } = request.body;
      const existingMovie = prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid movie");
      }

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      return response.status(200).json(user);
    }
  
    if (request.method === "DELETE") {
      const { currentUser } = await serverAuth(request, response);
      const { movieId } = request.query;
      const existingMovie = prismadb.movie.findUnique({
        where: {
          id: movieId as string,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid movie");
      }

      const updateIds = without(currentUser.favoriteIds, movieId as string);

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updateIds,
        },
      });

      return response.status(200).json(user);
    }

    return response.status(405).end();
  } catch (error) {
    console.log(error);
    return response.status(404).end();
  }
}
