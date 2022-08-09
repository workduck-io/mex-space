# Mex space

A monorepo for sharing packages across different applications (Desktop, web, etc)

## Development server

Run `yarn start` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Mex Components and Storybook

To start storybook of mex-components

```
cd ./libs/mex-components
yarn storybook
```

## Publishing the mex-components

0. Bump the version

1. Build `mex-components`

```
nx build mex-components
```

2. Copy the `.npmrc` for publishing in `dist/libs/mex-components`

3. Run `npm publish` in `dist/libs/mex-components`

## To use mex-components locally

1. Build the `mex-components` package using `nx build mex-components`

2. Go to the output `dist/libs/mex-components` folder and link the `mex-components` package using `yarn link`

3. Inside of `node_modules`, link the `react`, `react-dom` and `styled-components` packages

4. Go to the repository where you need to use it and link all the local packages using `yarn link @workduck-io/mex-components react react-dom styled-components`
