import React, { useCallback, useMemo } from "react";
import axios from "axios";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import useFavourites from "@/hooks/useFavourites";
import useCurrentUser from "@/hooks/useCurrentUser";

type Props = {
  movieId: string;
};

const FavouriteButton: React.FC<Props> = ({ movieId }: Props) => {
  const { mutate: mutateFavourites } = useFavourites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavourite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavourite = useCallback(async () => {
    let response;
    if (isFavourite) {
      response = await axios.delete("/api/favourite", {
        params: { movieId },
      });
    } else {
      response = await axios.post("/api/favourite", { movieId });
    }
    const updateFavIds = response?.data?.favouriteIds;

    mutate({
      ...currentUser,
      favouriteIds: updateFavIds,
    });

    mutateFavourites();
  }, [movieId, mutate, mutateFavourites, isFavourite, currentUser]);

  const Icon = isFavourite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavourite}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex items-center justify-center transition hover:border-neutral-300"
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavouriteButton;
