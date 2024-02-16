import { QueryParams } from "./types";

export const CATS_URL = "https://api.thecatapi.com/v1";

export const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_API_KEY,
});

export const requestOptions: RequestInit = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};

export function objectToQueryParams(params: QueryParams) {
  const searchParams = new URLSearchParams();

  for (const key in params) {
    const value = params[key];
    if (value !== undefined && value !== null) {
      searchParams.append(key, value.toString());
    }
  }

  return searchParams.toString();
}
