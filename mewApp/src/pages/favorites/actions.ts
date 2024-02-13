import { useQuery } from "@tanstack/react-query";
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
  return useQuery<Array<Favorite>>(["fetchIndividualCat"], fetchFavs);
};
