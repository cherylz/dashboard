# Prototype of User Account Dashboard

[Live demo](https://account-dashboard.netlify.com/)

## Instructions

- Go to the [live demo](https://account-dashboard.netlify.com/).
- Click the pencil icon next to the account number to make changes.

## Installation

- Run `npm install` to install the dependencies.
- Run `npm start` to make edits in the development mode.

Happy hacking!

## Discussion

The technologies used to build this app are JavaScript, React, HTML, and CSS.

The app has been tested in the latest version of Chrome.

Regarding `OverlayWrapper.js` and `AccountNumberChangeBoard.js`, if we have more dialogs to handle more types of user actions (e.g., adjusting the account charge date), we may further abstract the common parts. For example, if these dialogs have title and close/cancel buttons, we may move these parts from each dialog (e.g., `AccountNumberChangeBoard.js`) to `OverlayWrapper.js`.

Regarding `style.css`, if I had additional time, I would avoid using generic selectors such as `html` and `*` in the style sheet in order to make the styles less brittle when working with large projects.
