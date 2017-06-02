# Thingy:52 Web App

This repository contains the source code and instructions for building the [Thingy:52](http://www.nordicsemi.com/thingy/) reference web app. View the live version of this web app at [https://developer.nordicsemi.com/thingy/52](https://developer.nordicsemi.com/thingy/52). 

The web app is built with [Polymer 1.0](https://www.polymer-project.org/1.0/docs/about_10) and uses the [Web Bluetooth API](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web) to communicate with Thingy:52. The Web Bluetooth API is supported in the latest versions of Chrome and Opera on Android, Windows, Linux, Chrome OS and OS X. Check out the [up to date list of implementation status in different browsers](https://github.com/WebBluetoothCG/web-bluetooth/blob/gh-pages/implementation-status.md#chrome).

### Recommendations
1. If you are unfamiliar with the Web Bluetooth API a great starting point is the [Interact with Bluetooth devices on the Web](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web) guide by François Beaufort.
* If you are unfamiliar with Polymer a good starting point is the official [Polymer 1.0 Get Started](https://www.polymer-project.org/1.0/start/index) guide. 

### Pre-requisites
##### Node.js
Install an [active LTS version of Node.js](https://github.com/nodejs/LTS) (4.x or 6.x). The current version (7.x) should work, but is not officially supported.
##### Git
Install [Git](https://git-scm.com/downloads)
##### Bower
```
npm install -g bower
```
##### Polymer-CLI
```
npm install -g polymer-cli
```
### Installation instructions
1. Clone this repository
* Make sure you have all pre-requisites
* Browse inside the repo folder and start a local web server to test the project
```
polymer serve
```
The web app will open automatically in your default browser.

### Build the project
Browse inside the project and use polymer-cli to build.
```
polymer build
```
This will create a new *build* folder. Inside is a *bundled* and *unbundled* folder. To learn more about the build process and the output please check out the official [polymer-cli documentation](https://www.polymer-project.org/1.0/docs/tools/polymer-cli).

### License

Copyright (c) 2010 - 2017, Nordic Semiconductor ASA
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form, except as embedded into a Nordic
   Semiconductor ASA integrated circuit in a product or a software update for
   such product, must reproduce the above copyright notice, this list of
   conditions and the following disclaimer in the documentation and/or other
   materials provided with the distribution.

3. Neither the name of Nordic Semiconductor ASA nor the names of its
   contributors may be used to endorse or promote products derived from this
   software without specific prior written permission.

4. This software, with or without modification, must only be used with a
   Nordic Semiconductor ASA integrated circuit.

5. Any software provided in binary form under this license must not be reverse
   engineered, decompiled, modified and/or disassembled.

THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS
OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
OF MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 
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