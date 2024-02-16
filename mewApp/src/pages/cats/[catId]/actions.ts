import { useQuery } from "@tanstack/react-query";
import { CatData } from "../../../types";
import { CATS_URL, requestOptions } from "../../../utils";

// -----  get individual Cat ------ //

const fetchCat = async (id: string) => {
  const res = await fetch(`${CATS_URL}/images/${id}`, requestOptions);
  if (!res.ok) {
    throw new Error("Error fetching cats");
  }
  return res.json();
};

const useGetCat = (id: string, onSuccess?: () => void) => {
  return useQuery<CatData>(["fetchIndividualCat", id], () => fetchCat(id), {
    staleTime: 20000,
    onSuccess,
  });
};

export default useGetCat;
