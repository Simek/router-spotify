import { type SetStateAction } from "react";

export async function fetchAPI(
  path: string,
  authToken: string | null,
  setter: SetStateAction<any>,
) {
  await fetch(`https://api.spotify.com/v1/${path}`, {
    headers: { Authorization: `Bearer ${authToken}` },
  })
    .then((response) => {
      if (response.status === 204) {
        return {};
      }
      return response.json();
    })
    .then((data) => {
      setter(data);
    });
}

export async function fetAPIControl(
  path: string,
  authToken: string | null,
  method?: string,
  body?: string,
) {
  await fetch(`https://api.spotify.com/v1/${path}`, {
    headers: { Authorization: `Bearer ${authToken}` },
    method: method ?? "PUT",
    body,
  }).then(() => {});
}
