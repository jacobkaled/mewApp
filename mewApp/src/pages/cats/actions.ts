import { useInfiniteQuery } from "@tanstack/react-query";
import { CatsResp, QueryParams } from "../../types";
import { CATS_URL, requestOptions } from "../../utils";

export const fetchCats = async (params: QueryParams) => {
  const searchParams = new URLSearchParams();

  for (const key in params) {
    if (params[key] !== undefined && params[key] !== null) {
      searchParams.append(key, params[key]!.toString());
    }
  }

  return fetch(
    `${CATS_URL}/images/search?${searchParams.toString()}`,
    requestOptions
  ).then((res) => res.json());
  //.then((data) => console.log("data", data));
};

export const useGetCats = (
  queryParams: QueryParams,
  onSuccess?: () => void
) => {
  return useInfiniteQuery<CatsResp>(
    {
      queryKey: ["fetch-cats", JSON.stringify(queryParams)],
      queryFn: ({ pageParam }: { pageParam: number }) => {
        return fetchCats({
          ...queryParams,
          limit: "5",
          page: (pageParam ?? 0).toString(),
        });
      },
      getNextPageParam: (_: CatsResp, allPages: CatsResp) => {
        return allPages ? allPages.length : 0;
      },
      staleTime: 20000000,
    },
    {
      keepPreviousData: true,
      onSuccess,
    }
  );
};

export default useGetCats;
