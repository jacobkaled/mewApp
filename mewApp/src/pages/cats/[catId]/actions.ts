import { useQuery } from "@tanstack/react-query";
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

export default useGetCat;
