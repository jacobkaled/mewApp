import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_KEY } from "../cats/actions";
import { Favorite } from "@mui/icons-material";

type Favorite = {
  created_at: string;
  id: number;
  image: { id: string; url: string };
  image_id: string;
  sub_id: string | null;
  user_id: string;
};

export const fetchFavs = async () => {
  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  });
  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  return fetch(`https://api.thecatapi.com/v1/favourites`, requestOptions).then(
    (res) => res.json()
  );
  // .then((data) => console.log("favs", data));
};

export const useGetFavs = () => {
  return useQuery<Array<Favorite>>(["fetchFavorites"], fetchFavs);
};

// remove cat from Favs  ........  //
export const removeFromFavs = async (favId: string) => {
  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  });
  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: headers,
  };

  return fetch(
    `https://api.thecatapi.com/v1/favourites/${favId}`,
    requestOptions
  ).then((res) => res.json());
  // .then((data) => console.log("favs", data));
};

export const useRemoveFromFavs = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(["RemoveFromFavs"], (favId) => removeFromFavs(favId), {
    onSuccess: () => {
      queryClient
        .invalidateQueries(["fetchFavorites"])
        .then(() => onSuccess && onSuccess());
    },
  });
};
