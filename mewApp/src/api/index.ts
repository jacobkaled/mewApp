const customFetch = (url: string, method: "GET" | "DELETE") => {
  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "DEMO-API-KEY",
  });

  const options: RequestInit = {
    method,
    headers: headers,
    redirect: "follow",
  };

  return fetch(url, options);
};

export default customFetch;
