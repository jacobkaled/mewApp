import { useQuery } from "@tanstack/react-query";

const API_KEY =
  "live_puw6ufBzDBnh6Wyde05s6J81oK1NS9lWzyignHoXN5yUhwYJeKPjLbCYF2zNMgIq";

const fetchCats = async () => {
  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  });

  type Breed = {
    weight: { imperial: string; metric: string };
    id: string;
    name: string;
    temperament: string;
    origin: string;
    country_codes: string;
    country_code: string;
    life_span: string;
    wikipedia_url: string;
  };

  type CatsResp = Array<{
    height: number;
    id: string;
    url: string;
    width: number;
    favourite?: any;
    breeds: Array<Breed>;

    // categories: Array<{ id: string; name: string }>;
  }>;

  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  const res = await fetch(
    "https://api.thecatapi.com/v1/images/search?limit=5",
    requestOptions
  );
  const res1 = await res.json();
  console.log("data=>", res1);
  return res1 as CatsResp;
};

const useGetCats = () => {
  return useQuery(["fetchCats"], fetchCats);
};

export default useGetCats;
