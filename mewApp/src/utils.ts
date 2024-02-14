import { API_KEY } from "./types";

export const CATS_URL = "https://api.thecatapi.com/v1";

export const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
});

export const requestOptions: RequestInit = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};
