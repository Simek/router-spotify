# `router-spotify`

A stub app created to dogfood `expo-router`, `nativewind` and other Expo SDK packages.

## Development builds

You can download the latest development build using links below:
* [Android](https://expo.dev/accounts/simek/projects/router-spotify/builds/af76897b-52bf-4ffb-bdb9-4bccb7f6591b)
* [iOS](https://expo.dev/accounts/simek/projects/router-spotify/builds/a95f6e87-83da-4d81-a0e6-d0843274b01d) (simulator only)

## Contributing

1. Create new Spotify App at https://developer.spotify.com/dashboard/create.
   * Set Redirect URI to: `routerspotify://`.
2. Enter the app Client ID and Secret in `.env.example`, then rename file to `.env.local`.

You can also skip authentication part, by setting `SKIP_AUTH` flag in root layout file to `true`:
* https://github.com/simek/router-spotify/blob/main/app/_layout.tsx#L29-L29
