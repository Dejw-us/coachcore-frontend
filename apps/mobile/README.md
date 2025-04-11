# Coach Core frontend

## Mobile app folder structure

- `app` - this folder contains layouts, screens and tabs for the app. (tabs) folder inside is used for handling tab navigation.
- `assets` - just assets folder
- `components` - this folder contains .tsx files. use `common` folder for storing common components such as Header.tsx etc. For category related components that are not ui create seperate folder like `plan` or `unit`. In `ui` folder store ui components that are built with smaller components.
- `constants` - expo generated folder for constants. Use for constant values
- `hooks` use this folder for custom hooks. Organize related hooks into folders
