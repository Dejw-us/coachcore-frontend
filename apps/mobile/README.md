# Coach Core frontend

## Mobile app folder structure

- `app` - this folder contains layouts, screens and tabs for the app. (tabs) folder inside is used for handling tab navigation.
- `assets` - just assets folder
- `components` - this folder contains .tsx files. use `common` folder for storing common components such as Header.tsx etc. For category related components that are not ui create seperate folder like `plan` or `unit`. In `ui` folder store ui components that are built with smaller components.
- `constants` - expo generated folder for constants. Use for constant values
- `hooks` use this folder for custom hooks. Organize related hooks into folders

## Env vars

- 8089 - authorization server port
- 8080 - gateway port

- `EXPO_PUBLIC_AUTH_URL` - authentication endpoint for obtaining auth code. Set it to http://`HOST`:8089/oauth2/authorize for dev
- `EXPO_PUBLIC_TOKEN_URL` - endpoint for obtaining access token using auth code. Set it to http://`HOST`:8089/oauth2/token for dev
- `EXPO_PUBLIC_CLIENT_SECRET` - oauth2 client secret. Set it to `web-app-secret` for dev
- `EXPO_PUBLIC_CLIENT_ID` - oauth2 client id. Set it to `coachcore-web-ap` for dev
- `EXPO_PUBLIC_GATEWAY_URL` - Entrypoint for most of requests. Set it to http://`HOST`:8080 for dev
- `EXPO_PUBLIC_LOGOUT_URL` - logout url. set it to http://`HOST`:8089/logout for dev
