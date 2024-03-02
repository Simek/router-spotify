# `router-spotify`

A stub app created to dogfood `expo-router`, `nativewind` and other Expo SDK packages.

## Development builds

You can download the latest development build using links below:
* [Android](https://expo.dev/accounts/simek/projects/router-spotify/builds/5539d106-dd08-4b6e-80d4-042346fbbe2a)
* [iOS](https://expo.dev/accounts/simek/projects/router-spotify/builds/961ff9d3-c565-4a99-85ac-d8e1b0213db6) (simulator only)

## Contributing

1. Create new Spotify App at https://developer.spotify.com/dashboard/create.
   * Set Redirect URI to: `routerspotify://`.
2. Enter the app Client ID and Secret in `.env.example`, then rename file to `.env.local`.

You can also skip authentication part, by setting `SKIP_AUTH` flag in root layout file to `true`:
* https://github.com/simek/router-spotify/blob/main/app/_layout.tsx#L29-L29
