## Building Todoist from Scratch Using React (Custom Hooks, Context), Firebase & React Testing Library (http://bit.ly/CognitiveSurge)

This application (a Todoist clone) was built using create-react-app as a base, and the technologies used were React (Custom Hooks, Context), Firebase & React Testing Library. I'm hoping this gives people a better understanding of React, and I've also included SCSS in this tutorial, but the main focus is to build a real application using React! If you clone this application, click the Pizza icon on the top right, it enables dark mode!

Subscribe to my YouTube channel here: http://bit.ly/CognitiveSurge where I build projects like this! And don't forget, you can contribute to this project (highly encouraged!). One thing I didn't get time to do was incorporate accessibility into this application, so I'd love to see that added!

## Getting started

1. Install dependencies: `yarn install` (or `npm install`).
2. Create your Firebase config. `src/firebase.js` is git-ignored, so it does not exist in a fresh clone and the app imports it. Copy the example and fill in the values from your Firebase project:

   ```sh
   cp src/firebase.js.example src/firebase.js
   ```

3. Start the development server: `yarn start` (or `npm start`).

## Running the tests

To run the test suite, use `yarn test` (or `npm test`). This starts Jest in watch mode (`react-scripts test --watchAll`) and does not exit on its own.

For a single run, such as in CI, use `CI=true yarn test`. Add `--coverage` to check coverage against the 90% global threshold configured in `package.json`.

## Building

To create a production build, use `yarn build` (or `npm run build`).

![Preview](todoist-preview.png?raw=true)
