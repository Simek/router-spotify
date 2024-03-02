import { type SetStateAction } from "react";

export function fetchAPI(
  path: string,
  authToken: string | null,
  setter: SetStateAction<any>,
) {
  fetch(`https://api.spotify.com/v1/${path}`, {
    headers: { Authorization: `Bearer ${authToken}` },
  })
    .then((response) => response.json())
    .then((data) => {
      setter(data);
    });
}
