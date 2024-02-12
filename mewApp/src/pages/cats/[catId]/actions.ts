import { useQuery } from "@tanstack/react-query";

const fetchCats = async () => {
  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "DEMO-API-KEY",
  });

  type CatResp = Array<{
    height: number;
    id: string;
    url: string;
    width: number;
  }>;

  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  const res = await fetch(
    "https://api.thecatapi.com/v1/images/search?limit=10",
    requestOptions
  );
  const res1 = await res.json();
  return res1 as CatResp;
};

const useGetCats = () => {
  return useQuery(["fetchCat"], fetchCats);
};

export default useGetCats;
