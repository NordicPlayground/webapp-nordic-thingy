# Thingy:52 Polymer and React web apps

This repository contains source code and instructions for building Polymer and React web apps showcasing the features of [Thingy:52](http://www.nordicsemi.com/thingy/). To view the live version of the Polymer web app, [click here](https://developer.nordicsemi.com/thingy/52), and to view the live version of the React web app, [click here](https://developer.nordicsemi.com/thingy/52/react).

## Apps
 - [Polymer](#polymer)
 - [React](#react)

# Polymer

The web app is built with [Polymer 1.0](https://www.polymer-project.org/1.0/docs/about_10) and uses the [Web Bluetooth API](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web) to communicate with Thingy:52. The Web Bluetooth API is supported in the latest versions of Chrome and Opera on Android, Windows, Linux, Chrome OS and OS X. Check out the [up to date list of implementation status in different browsers](https://github.com/WebBluetoothCG/web-bluetooth/blob/gh-pages/implementation-status.md#chrome).

### Recommendations
* Learn about the Web Bluetooth API by reading the [Interact with Bluetooth devices on the Web](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web) guide by François Beaufort.
* Learn about Polymer by reading the official [Polymer 1.0 Get Started](https://www.polymer-project.org/1.0/start/index) guide. 

### Prerequisites
#### Node.js
Install an [active LTS version of Node.js](https://github.com/nodejs/LTS) (4.x or 6.x). The current version (7.x) should work, but is not officially supported.
#### Git
Install [Git](https://git-scm.com/downloads)
#### Bower
```
npm install -g bower
```
#### Polymer-CLI
```
npm install -g polymer-cli
```
### Installation instructions
1. Clone this repository
2. Make sure you have all prerequisites
3. Browse inside the webapp-nordic-thingy folder and download dependencies with bower
```
bower install
```
4. Start a local web server to test the project
```
polymer serve -o
```
The web app will open automatically in your default browser.

### Build the project
Browse inside the project and use polymer-cli to build.
```
polymer build
```
This will create a new *build* folder. Inside is a *bundled* and *unbundled* folder. To learn more about the build process and the output please check out the official [polymer-cli documentation](https://www.polymer-project.org/1.0/docs/tools/polymer-cli).
 
### Third-party licenses

#### three.js
[MIT License](https://github.com/mrdoob/three.js/blob/dev/LICENSE)
#### chart.js
[MIT License](https://github.com/chartjs/Chart.js/blob/master/LICENSE.md)
#### Polymer
Copyright (c) 2017 The Polymer Authors. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

   * Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.
   * Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following disclaimer
in the documentation and/or other materials provided with the
distribution.
   * Neither the name of Google Inc. nor the names of its
contributors may be used to endorse or promote products derived from
this software without specific prior written permission.


# React

### Recommendations
* This web app was built using a Web Bluetooth API which aims to make it easier to start developing Web Bluetooth applications using Thingy:52. To find out more about this API, [click here](https://github.com/NordicPlayground/Nordic-Thingy52-Thingyjs).
* Learn about the Web Bluetooth API by reading the [Interact with Bluetooth devices on the Web](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web) guide by François Beaufort.
* Learn about React by reading the official [React - getting started](https://reactjs.org/docs/getting-started.html) guide.
* For an introduction in how to quickly and effortlessly create React apps, visit [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app).


### Prerequisites
 * **Node.js** - Install an [active LTS version of Node.js](https://github.com/nodejs/LTS) (e.g. v8.11.3). The current version (10.6.0) should work, but is not officially supported.
 * **Git** - If you want to clone this repository, you will have to install [Git](https://git-scm.com/downloads). Alternatively, you can download the repository by clicking "Clone or download", and then "Download ZIP".
 * **Google Chrome** - As [Google Chrome](https://www.google.com/chrome/) is currently the only browser supporting Web Blueooth, you will need it to use the web app.
 * **Web Bluetooth polyfill for Windows 10** - If you are using Windows you will have to install a polyfill to enable Web Bluetooth. A guide with download and setup instructions can be found [here](https://github.com/urish/web-bluetooth-polyfill).

### Installation instructions
1. Clone or download this repository.
2. Make sure you have all prerequisites.
3. Open a command line tool, navigate to the root folder of the repository, and download dependencies by typing:
```
npm i
```
4. To test the project, type:
```
npm start
```
### Build the project
From the root folder of the project, in a command line tool, write:
```
npm run build
```
This will create a new *build* folder. Inside is a *bundled* package of the website. The build can now be hosted by any server that is able to serve static files.

**Note**: If you want to serve the build from a folder other than the root folder, open the package.json file and change the "homepage" field to match your desired path.
 
### Third-party licenses

* **React** - [MIT License](https://github.com/facebook/react/blob/master/LICENSE)
* **three.js** - [MIT License](https://github.com/mrdoob/three.js/blob/dev/LICENSE)
* **Recharts** - [MIT License](https://github.com/recharts/recharts/blob/master/LICENSE)
* **Redux** - [MIT License](https://github.com/reduxjs/redux/blob/master/LICENSE.md)
* **React-toastify** - [MIT License](https://github.com/fkhadra/react-toastify/blob/master/LICENSE)
* **React-redux** - [MIT License](https://github.com/reduxjs/redux-thunk/blob/master/LICENSE.md)
* **React-three-renderer** - [MIT License](https://github.com/toxicFork/react-three-renderer/blob/master/LICENSE)
* **React-syntax-highlighter** - [MIT License](https://github.com/conorhastings/react-syntax-highlighter/blob/master/LICENSE)
* **Create-react-app** - [MIT License](https://github.com/facebook/create-react-app/blob/next/LICENSE)
* **React-router** - [MIT License](https://github.com/ReactTraining/react-router/blob/master/LICENSE)
* **React-responsive** - [MIT License](https://github.com/contra/react-responsive/blob/master/LICENSE)
* **Redux** - [MIT License](https://github.com/reduxjs/redux/blob/master/LICENSE.md)
* **React-router** - [MIT License](https://github.com/ReactTraining/react-router/blob/master/LICENSE)
* **Material-ui** - [MIT License](https://github.com/mui-org/material-ui/blob/master/LICENSE)
* **Babel-eslint** - [MIT License](https://github.com/babel/babel-eslint/blob/master/LICENSE)
* **Eslint** - [MIT License](https://github.com/eslint/eslint/blob/master/LICENSE)
* **Eslint-config-google** - [MIT License](https://github.com/google/eslint-config-google/blob/master/LICENSE)
* **Eslint-plugin-react** - [MIT License](https://github.com/yannickcr/eslint-plugin-react/blob/master/LICENSE)
* **React-emojione** - [MIT License](https://github.com/pladaria/react-emojione#license)



THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

