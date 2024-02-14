import { useInfiniteQuery } from "@tanstack/react-query";

export const API_KEY =
  "live_puw6ufBzDBnh6Wyde05s6J81oK1NS9lWzyignHoXN5yUhwYJeKPjLbCYF2zNMgIq";

export type QueryParams = {
  limit?: string;
  page?: string;
  breed_ids?: string;
};

export type Breed = {
  weight?: { imperial: string; metric: string };
  adaptability?: number;
  affection_level?: number;
  alt_names?: string;
  cfa_url?: string;
  child_friendly?: string;
  country_code: string;
  country_codes: string;
  description?: string;
  dog_friendly?: number;
  energy_level?: number;
  experimental?: number;
  grooming?: number;
  hairless?: number;
  health_issues?: number;
  hypoallergenic?: number;
  id: string;
  indoor?: number;
  intelligence?: number;
  lap?: number;
  life_span: string;
  name: string;
  natural?: number;
  origin: string;
  rare?: number;
  reference_image_id?: string;
  rex?: number;
  shedding_level?: number;
  short_legs?: number;
  social_needs?: number;
  stranger_friendly?: number;
  suppressed_tail?: number;
  temperament: string;
  vcahospitals_url?: string;
  vetstreet_url?: string;
  vocalisation?: number;
};

export type Breeds = Array<Breed>;

export type Cat = {
  height: number;
  id: string;
  url: string;
  width: number;
  favourite?: boolean;
  breeds: Breeds | [];
};

export type CatsResp = Array<Cat>;

export const fetchCats = async (params: QueryParams) => {
  const searchParams = new URLSearchParams();

  for (const key in params) {
    if (params[key] !== undefined && params[key] !== null) {
      searchParams.append(key, params[key].toString());
    }
  }

  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  });
  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };
  //   const queryParams = new URLSearchParams(
  //     //{
  //     // page,
  //     // limit: "5",
  //     // breed_ids: breedId ?? "",
  //     //has_breeds: "1", //temporarily
  //     //}
  //     { ...args }
  //   ).toString();

  return fetch(
    `https://api.thecatapi.com/v1/images/search?${searchParams.toString()}`,
    requestOptions
  ).then((res) => res.json());
  //.then((data) => console.log("data", data));
};

export const useGetCats = (
  queryParams: QueryParams,
  onSuccsess?: () => void
) => {
  return useInfiniteQuery<CatsResp>(
    {
      queryKey: ["fetch-cats"],
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
      staleTime: 20000,
    },
    {
      keepPreviousData: true,
      onSuccess: onSuccsess?.(),
    }
  );
};

export default useGetCats;
