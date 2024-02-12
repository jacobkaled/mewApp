import { useQuery } from "@tanstack/react-query";
import { API_KEY } from "../actions";

const fetchCat = async (id: string) => {
  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
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
    `https://api.thecatapi.com/v1/images/${id}`,
    requestOptions
  );
  const res1 = await res.json();
  console.log("one-cat", res1);
  return res1 as CatResp;
};

const useGetCat = (id: string) => {
  return useQuery(["fetchIndividualCat"], () => fetchCat(id));
};

export default useGetCat;
