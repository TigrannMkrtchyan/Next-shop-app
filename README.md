Simple shop app written in next and typescript

## Prepare

Install all project dependencies - `npm install`
Install Husky to enable the pre-commit hooks - `npm run prepare`
create .env file and add data from .env.example

## Available Scripts

In the project directory, you can run:

### `npm run  dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the all tests we have in this template (e2e, integration, unit).

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


## Folder Structure:

    1. Create all your components in the components directory.
    2. Each Component directory must look like this
        a. Index.tsx
        b. Index.scss
    3. Same about separate pages. Create them in the pages directory with the same structure. If there are any helper function specific to your component create a helpers folder in your component directory and create your helpers in there.
    4. When creating test file - write the name of the function or component, that you are testing and then depending if that is a unit or integration test add .integration.test.tsx or just .test.ts.
    5. Any website assets should be kept in the public directory there is already folders for images and icons.
    6. Hooks must be in the hooks directory. Hooks name must start with the word “use” followed by a descriptive name, such as useFetch or useWindowWidth.
    7. Any utility files or functions should be located in the utils directory.

