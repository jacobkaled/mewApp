import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CatData } from "../../../types";
import { CATS_URL, headers, requestOptions } from "../../../utils";

// -----  get individual Cat ------ //

const fetchCat = async (id: string) => {
  return fetch(`${CATS_URL}/images/${id}`, requestOptions).then((resp) =>
    resp.json()
  );
};

const useGetCat = (id: string) => {
  return useQuery<CatData>(["fetchIndividualCat", id], () => fetchCat(id), {
    staleTime: 20000,
  });
};

// --------- create favourite cat ------------------- //

const makeCatFav = async (imageId: string) => {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      image_id: imageId,
    }),
  };

  return fetch(`${CATS_URL}/favourites`, requestOptions).then((resp) =>
    resp.json()
  );
};

export const useMakeCatFav = (imageId: string, onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(["MakeCatFav"], () => makeCatFav(imageId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchFavorites"]);
      onSuccess && onSuccess();
    },
  });
};

export default useGetCat;
