import { useMutation, useQuery } from "@tanstack/react-query";
import { API_KEY, Cat } from "../actions";

// type CatResp = {
//   height: number;
//   id: string;
//   url: string;
//   width: number;
// };

const fetchCat = async (id: string) => {
  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  });

  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  const res = await fetch(
    `https://api.thecatapi.com/v1/images/${id}`,
    requestOptions
  );
  const res1 = await res.json();
  return res1;
};

const useGetCat = (id: string) => {
  return useQuery<Cat>(["fetchIndividualCat"], () => fetchCat(id));
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

  const res = await fetch(
    `https://api.thecatapi.com/v1/favourites`,
    requestOptions
  );
  const res1 = await res.json();
  return res1;
};

export const useMakeCatFav = (imageId: string) => {
  return useMutation<Cat>(["MakeCatFav"], () => makeCatFav(imageId));
};

export default useGetCat;
