import { useMutation, useQuery } from "@tanstack/react-query";
import { API_KEY, Cat } from "../../../types";
import { CATS_URL, requestOptions } from "../../../utils";

const fetchCat = async (id: string) => {
  const res = await fetch(`${CATS_URL}/images/${id}`, requestOptions);
  const res1 = await res.json();
  return res1;
};

const useGetCat = (id: string) => {
  return useQuery<Cat>(["fetchIndividualCat", id], () => fetchCat(id), {
    staleTime: 20000,
  });
};

////// --------- create favs cats------------------- //

const makeCatFav = async (imageId: string) => {
  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      image_id: imageId,
    }),
  };

  const res = await fetch(`${CATS_URL}/favourites`, requestOptions);
  const res1 = await res.json();
  return res1;
};

type FavResp = { id: string; message: string };

export const useMakeCatFav = (imageId: string, onSuccess?: () => void) => {
  return useMutation<FavResp>(["MakeCatFav"], () => makeCatFav(imageId), {
    onSuccess,
  });
};

export default useGetCat;
