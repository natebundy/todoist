## Building Todoist from Scratch Using React (Custom Hooks, Context), Firebase & React Testing Library (http://bit.ly/CognitiveSurge)

This application (a Todoist clone) was built using create-react-app as a base, and the technologies used were React (Custom Hooks, Context), Firebase & React Testing Library. I'm hoping this gives people a better understanding of React, and I've also included SCSS in this tutorial, but the main focus is to build a real application using React! If you clone this application, click the Pizza icon on the top right, it enables dark mode!

Subscribe to my YouTube channel here: http://bit.ly/CognitiveSurge where I build projects like this! And don't forget, you can contribute to this project (highly encouraged!). One thing I didn't get time to do was incorporate accessibility into this application, so I'd love to see that added!

Before running the app, copy `src/firebase.js.example` to `src/firebase.js` and fill in your Firebase config.

To run the test suite, use `yarn test` (or `npm test`).

To start the development server, use `yarn start` (or `npm start`).

To create a production build in the `build/` folder, use `yarn build` (or `npm run build`).

### Smoke check

To validate the `public/status.json` fixture, run `node scripts/smoke-status.js`. It exits with code 0 and prints a single success line when `status` is `"ok"`, and exits non-zero with a message if the file is missing, is not valid JSON, or has any other status. It uses only Node built-ins, so it needs no install step and no Firebase config.

![Preview](todoist-preview.png?raw=true)
