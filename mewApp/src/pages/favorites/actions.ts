import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { FavoritesRes } from "../../types";
import { CATS_URL, headers, requestOptions } from "../../utils";

// remove cat from Favs  ........  //
export const removeFromFavs = async (favId: string) => {
  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: headers,
  };

  return fetch(`${CATS_URL}/favourites/${favId}`, requestOptions).then((res) =>
    res.json()
  );
};

export const useRemoveFromFavs = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["RemoveFromFavs"],
    (data: { favId: string }) => removeFromFavs(data.favId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fetchFavorites"]);
        onSuccess && onSuccess();
      },
    }
  );
};

export const fetchFavorites = async (pagenum: string) => {
  return fetch(
    `${CATS_URL}/favourites?limit=10&page=${pagenum}`,
    requestOptions
  ).then((res) => res.json());
  // .then((data) => console.log("favs", data));
};

export const useGetFavoriteCats = (onSuccess?: () => void) => {
  return useInfiniteQuery<FavoritesRes>(
    {
      //@ts-expect-error todo
      queryKey: ["fetchFavorites"],
      queryFn: ({ pageParam }: { pageParam: number }) => {
        return fetchFavorites((pageParam ?? 0).toString());
      },
      getNextPageParam: (lastPage: FavoritesRes, allPages: FavoritesRes) => {
        if (lastPage.length === 0) return undefined;
        return allPages ? allPages.length : 0;
      },
    },
    {
      keepPreviousData: true,
      onSuccess,
    }
  );
};
