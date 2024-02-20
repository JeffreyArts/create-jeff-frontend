# Jeff frontend

This is a boilerplate for a frontend application using Vue3, Typescript, Vue Router, Pinia, Vite-SSG, Lodash, PouchDB, Sass, normalize.css & SocketIO. It is has default support for using Strapi as headless CMS and multi language support via VUE i18n.

## Features

- [Axios](https://github.com/axios/axios)
- [GSAP](https://github.com/greensock/GSAP)
- [Lodash](https://github.com/lodash/lodash)
- [normalize.css](https://github.com/necolas/normalize.css)
- [Pinia](https://github.com/vuejs/pinia)
- [PouchDB](https://github.com/pouchdb/pouchdb)
- [Sass](https://github.com/sass/sass)
- [SocketIO](https://github.com/socketio/socket.io-client)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Vite](https://github.com/vitejs/vite)
- [Vite-SSG](https://github.com/antfu/vite-ssg)
- [Vue 3](https://github.com/vuejs/vue)
- [Vue Router](https://github.com/vuejs/vue-router)
- [Vue i18n](https://github.com/intlify/vue-i18n-next)

## Getting started

To get the project up and running, execute the following commands;

```
$ npm install
$ npm run dev

or

$ yarn install
$ yarn dev
```

To build the project for production, run the following command:
```
$ npm run build 

or 

$ yarn build
```
This will build the project, and output the files to the dist directory.


### Strapi

This project has authentication support intergrated for Strapi 4.20.1. Modify the `.env` file to specify the desired endpoint for the Strapi back-end (VITE_STRAPI_REST_ENDPOINT=http://localhost:1337/api). More details about the way Strapi handles its users can be found in [https://docs.strapi.io/dev-docs/plugins/users-permissions](their documentation)

## Deployment
By default this application has a build-in feature to deploy the static generated website to a remote server. For this to work, you'll have to configure a `.env.staging` or `.env.production` file. Which is basically a copy of the `.env` or `.env.local` file, with the addition of the following 4 lines:

```
DEPLOYMENT_USER=<user>
DEPLOYMENT_HOST=<host>
DEPLOYMENT_PATH=/var/www/vite/<project>
MAX_BACKUPS=8
```
*DEPLOYMENT_USER* = The user that you'll use to login to the server
*DEPLOYMENT_HOST* = The hostname or ip address of the server 
*DEPLOYMENT_PATH* = The path of where you want to deploy the app to
*MAX_BACKUPS* = The amount of back-ups you want to keep

At the location of DEPLOYMENT_PATH the deployment script will create a `current` directory where the project is actually located. Whenever you'll do a future deployment, the current directory will be renamed to bk_<timecode> and the new version will be placed again at the current directory. The number that you specify at MAX_BACKUPS will determine how many old versions will be kept. Versions older than the number specified here will be removed automatically.

With the configuration of these 4 lines, you can now deploy the project with one of the following commands. 

For more information about this deployment script, I'd like to refer you to [this page](https://github.com/JeffreyArts/server/wiki/Vite-website-setup). This page will go into more depth, and also provides you with a basis for how you could set-up the server environment on a remote (VPS) server.


```
$ npm run deploy # Using .env.staging
$ npm run production # Using .env.producttion

or 

$ yarn deploy # Using .env.staging
$ yarn production # Using .env.production
```


## [License](https://github.com/JeffreyArts/create-jeff-backend/blob/master/LICENSE)

Copyright © 2023 <Jeffrey Arts>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
