import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { FavoritesRes } from "../../types";
import { CATS_URL, headers, requestOptions } from "../../utils";
import { useToastMessage } from "../../contexts/ToastContext";

//  ------- Remove cat from Favs   -------  //
export const removeFromFavs = async (favId: string) => {
  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: headers,
  };
  const res = await fetch(`${CATS_URL}/favourites/${favId}`, requestOptions);
  if (!res.ok) {
    throw new Error("Error removing cat from favourite");
  }
  return res.json();
};

export const useRemoveFromFavs = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { setToastInfo } = useToastMessage();
  return useMutation(
    ["RemoveFromFavs"],
    (data: { favId: string }) => removeFromFavs(data.favId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fetchFavorites"]);
        setToastInfo({
          isOpen: true,
          message: "cat was successfully deleted from favorites",
          type: "Success",
        });
        onSuccess && onSuccess();
      },
      onError: (error) =>
        setToastInfo({
          isOpen: true,
          message: `error: ${error}`,
          type: "Error",
        }),
    }
  );
};

// ---- get Favourite cats -------- //

export const fetchFavorites = async (pagenum: string) => {
  const res = await fetch(
    `${CATS_URL}/favourites?limit=10&page=${pagenum}`,
    requestOptions
  );
  if (!res.ok) {
    throw new Error("Error fetching favourite cats");
  }
  return res.json();
};

// ----- add cat to favourite ------ //

export const useGetFavoriteCats = () => {
  const { setToastInfo } = useToastMessage();
  return useInfiniteQuery<FavoritesRes>({
    //@ts-expect-error todo
    queryKey: ["fetchFavorites"],
    queryFn: ({ pageParam }: { pageParam: number }) => {
      return fetchFavorites((pageParam ?? 0).toString());
    },

    getNextPageParam: (lastPage: FavoritesRes, allPages: FavoritesRes) => {
      if (lastPage.length === 0) return undefined;
      return allPages ? allPages.length : 0;
    },
    onError: (error) =>
      setToastInfo({
        isOpen: true,
        message: `error: ${error}`,
        type: "Error",
      }),
  });
};

const makeCatFav = async (imageId: string) => {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      image_id: imageId,
    }),
  };
  const res = await fetch(`${CATS_URL}/favourites`, requestOptions);
  if (!res.ok) {
    throw new Error("Error adding cat to favorite");
  }
  return res.json();
};

export const useMakeCatFav = (imageId: string, onSuccess?: () => void) => {
  const { setToastInfo } = useToastMessage();
  const queryClient = useQueryClient();
  return useMutation(["MakeCatFav"], () => makeCatFav(imageId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchFavorites"]);
      setToastInfo({
        isOpen: true,
        message: "cat was successfully added to favorites",
        type: "Success",
      });
      onSuccess && onSuccess();
    },
    onError: (error) =>
      setToastInfo({
        isOpen: true,
        message: `error: ${error}`,
        type: "Error",
      }),
  });
};
