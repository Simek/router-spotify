import { type SetStateAction } from "react";

const DEBUG = false;

export async function fetchAPI(
  path: string,
  authToken: string | null,
  setter: SetStateAction<any>,
  onError?: () => void,
) {
  await fetch(`https://api.spotify.com/v1/${path}`, {
    headers: { Authorization: `Bearer ${authToken}` },
  })
    .then((response) => {
      if (DEBUG) {
        console.warn(`https://api.spotify.com/v1/${path}`, response.status);
      }
      if ([204, 401, 404].includes(response.status)) {
        onError?.();
        return null;
      }
      return response.json();
    })
    .then((data) => {
      setter(data);
    })
    .catch(console.error);
}

export async function fetchAPIControl(
  path: string,
  authToken: string | null,
  method?: string,
  body?: object,
) {
  await fetch(`https://api.spotify.com/v1/${path}`, {
    headers: { Authorization: `Bearer ${authToken}` },
    method: method ?? "PUT",
    body: body ? JSON.stringify(body) : undefined,
  }).then((response) => {
    if (DEBUG) {
      console.warn(`https://api.spotify.com/v1/${path}`, response.status);
    }
  });
}
