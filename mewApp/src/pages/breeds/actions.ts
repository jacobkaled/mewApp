import { useQuery } from "@tanstack/react-query";
import { API_KEY, Breeds } from "../../types";

export const fetchBreeds = async () => {
  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  });

  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  return fetch(`https://api.thecatapi.com/v1/breeds`, requestOptions).then(
    (res) => res.json()
  );
};

export const useGetCatsBreeds = () => {
  return useQuery<Breeds>(["fetchBreeds"], fetchBreeds);
};
