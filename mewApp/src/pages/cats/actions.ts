import { useInfiniteQuery } from "@tanstack/react-query";
import { CatsResp, QueryParams } from "../../types";
import { CATS_URL, objectToQueryParams, requestOptions } from "../../utils";
import { useToastMessage } from "../../contexts/ToastContext";

export const fetchCats = async (params: QueryParams) => {
  const res = await fetch(
    `${CATS_URL}/images/search?${objectToQueryParams(params)}`,
    requestOptions
  );
  if (!res.ok) {
    throw new Error("Error fetching cats");
  }
  return res.json();
};

export const useGetCats = (
  queryParams?: QueryParams,
  onSuccess?: () => void
) => {
  const { setToastInfo } = useToastMessage();
  return useInfiniteQuery<CatsResp>({
    //@ts-expect-error todo
    queryKey: ["GetCats", JSON.stringify({ ...queryParams })],
    queryFn: ({ pageParam }: { pageParam: number }) => {
      return fetchCats({
        ...queryParams,
        limit: "10",
        page: (pageParam ?? 0).toString(),
      });
    },
    getNextPageParam: (_: CatsResp, allPages: CatsResp) => {
      return allPages ? allPages.length : 0;
    },
    staleTime: 20000000,
    keepPreviousData: true,
    onError: (error) =>
      setToastInfo({
        isOpen: true,
        message: `error: ${error}`,
        type: "Error",
      }),
    onSuccess: onSuccess && onSuccess(),
  });
};

export default useGetCats;
