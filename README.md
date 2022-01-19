<p align="center">
  <a href="" rel="noopener">
 <img width="400" src="https://i.imgur.com/83Y7bWN.png" alt="React & Google Apps Script logos"></a>
</p>

<p align="center"> This project is for developing React app inside Google Slides. It's created based on this [template](https://github.com/enuchi/React-Google-Apps-Script).
</p>

---

## 📝 Table of Contents

- [📝 Table of Contents](#-table-of-contents)
- [Install <a name = "install"></a>](#install-)
  - [Prerequisites <a name = "prerequisites"></a>](#prerequisites-)
  - [Getting started <a name = "getting-started"></a>](#getting-started-)
- [Deploy <a name = "deploy"></a>](#deploy-)
- [Local Development <a name="local-development"></a>](#local-development-)
  - [Styles](#styles)
  - [Modifying scopes](#modifying-scopes)
  - [Calling server-side Google Apps Script functions](#calling-server-side-google-apps-script-functions)

<br/>

## Install <a name = "install"></a>

These instructions will get you set up with a copy of the React project code on your local machine. It will also get you logged in to `clasp` so you can manage script projects from the command line.

See [deploy](#deploy) for notes on how to deploy the project and see it live in a Google Slides project.

### Prerequisites <a name = "prerequisites"></a>

- Make sure you're running at least [Node.js](https://nodejs.org/en/download/) v10 and `npm` v6.

- You'll need to enable the Google Apps Script API. You can do that by visiting [script.google.com/home/usersettings](https://script.google.com/home/usersettings).

- [New!] To use live reload while developing, you'll need to serve your files locally using HTTPS. See [local development](#local-development) below for how to set up your local environment.

### Getting started <a name = "getting-started"></a>

**1.** First, let's clone the repo and install the dependencies.

```bash
git clone git@github.com:IgorShcherba/gslides-plugin.git
cd gslides-plugin
npm install
```

**2.** Next, we'll need to log in to [clasp](https://github.com/google/clasp), which lets us manage our Google Apps Script projects locally.

```bash
npm run login
```

<img width="100%" src="https://i.imgur.com/zKCgkMl.gif">

**3.** Now let's run the setup script to create a New Google Slides project and script project from the command line.

```bash
npm run setup
```

Alternatively, you can use an existing Google Slides and Script file instead of creating a new one.

<details>
  <summary>See instructions here for using an existing project.</summary>

You will need to update the `.clasp.json` file in the root of this project with the following three key/value pairs:

```json
{
  "scriptId": "1PY037hPcy................................................",
  "parentId": ["1Df30......................................."],
  "rootDir": "./dist"
}
```

- `scriptId`: Your existing script project's `scriptId`. You can find it by opening your slides, selecting **Tools > Script Editor** from the menubar, then **File > Project properties**, and it will be listed as "Script ID".

- `parentId`: An array with a single string, the ID of the parent file (spreadsheet, doc, etc.) that the script project is bound to. You can get this ID from the url, where the format is usually `https://script.google.com/home/projects/{id}/edit`. This allows you to run `npm run open` and open your file directly from the command line.

- `rootDir`: This should always be `"./dist"`, i.e. the local build folder that is used to store project files.

</details>

Next, let's deploy the app so we can see it live in Google Slides.

<br/>

## Deploy <a name = "deploy"></a>

Run the deploy command. You may be prompted to update your manifest file. Type 'yes'.

```bash
npm run deploy
```

The deploy command will build all necessary files using production settings, including all server code (Google Apps Script code), client code (React bundle), and config files. All bundled files will be outputted to the `dist/` folder, then pushed to the Google Apps Script project.

Now open Google Slides and find your plugin's menu item in the top menu. You can also run `npm run open`. Make sure to refresh the page if you already had it open.

<br/>

## Local Development <a name="local-development"></a>

We can develop our client-side React apps locally, and see our changes directly inside our Google Slides dialog window.

There are two steps to getting started: installing a certificate (first time only), and running the start command.

1. Generating a certificate for local development <a name = "generatingcerts"></a>

   Install the mkcert package:

   ```bash
   # mac:
   brew install mkcert

   # windows:
   choco install mkcert
   ```

   [More install options here.](https://github.com/FiloSottile/mkcert#installation)

   Then run the mkcert install script:

   ```bash
   mkcert -install
   ```

   Create the certs in your repo:

   ```
   npm run setup:https
   ```

2. Now you're ready to start:
   ```bash
   npm run start
   ```

The start command will create and deploy a development build, and serve your local files.

After running the start command, navigate to your Google Slides project and open one up your add-on. It should now be serving your local files. When you make and save changes to your React app, your app will reload instantly within the Google Slides, and have access to any server-side functions!

### Styles

By default this project supports global CSS stylesheets. Make sure to import your stylesheet in your entrypoint file [index.js](./src/client/dialog-demo/index.js):

```javascript
import './styles.css';
```

Many external component libraries require a css stylesheet in order to work properly. You can import stylesheets in the HTML template.

The webpack.config.js file can also be modified to support scss and other style libraries.

### Modifying scopes

The included app only requires access to Google Slides and to loading dialog windows. If you make changes to the app's requirements make sure to edit the oauthScopes in the [appscript.json file](./appsscript.json).
See https://developers.google.com/apps-script/manifest for information on the `appsscript.json` structure.

### Calling server-side Google Apps Script functions

This project uses the [gas-client](https://github.com/enuchi/gas-client) package to more easily call server-side functions using promises.

```js
// Google's documentation wants you to do this.
google.script.run
  .withSuccessHandler(response => doSomething(response))
  .withFailureHandler(err => handleError(err))
  .addSheet(sheetTitle);

// With a little magic we can now do this:
import Server from 'gas-client';
const { serverFunctions } = new Server();

// We now have access to all our server functions, which return promises!
serverFunctions
  .addSheet(sheetTitle)
  .then(response => doSomething(response))
  .catch(err => handleError(err));

// Or we can equally use async/await style:
async () => {
  try {
    const response = await serverFunctions.addSheet(sheetTitle);
    doSomething(response);
  } catch (err) {
    handleError(err);
  }
};
```

In development, `gas-client` will interact with [the custom Webpack Dev Server package](https://github.com/enuchi/Google-Apps-Script-Webpack-Dev-Server) which allows us to run our app within the dialog window and still interact with Google Apps Script functions.
