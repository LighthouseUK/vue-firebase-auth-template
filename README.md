# Firebase VueJS

> Firebase VueJS Skeleton Project

## About
This is a lightly modified version of the vue webpack template, and a skeleton project. The modifications to the webpack template
allow you to use multiple firebase project configs, configurable at runtime (via the cli). The skeleton project uses:

- `firebase`
- `firebaseui`
- `vue-router`
- `vue-kindergarten`

Using the above you get:

- system config loading
- user registration + login
- access control
- default route handling

## Firebase Configuration
You will need to run `firebase init` to setup your firebase project. This project includes firebase functions which run on user registration.

You need to add your firebase config to the `config` dir. I like to setup two (or more) firebase projects 
for each system I'm building (typically `dev` and `production`)

For example:

`example-project-id.js`
``` javascript


const env = {
  FIREBASE_CONFIG: {
    apiKey: '"adfoinadfhpinRPOwrpgaspfignpirnh"',
    authDomain: '"example-project-id.firebaseapp.com"',
    databaseURL: '"https://example-project-id.firebaseio.com"',
    projectId: '"example-project-id"',
    storageBucket: '"example-project-id.appspot.com"',
    messagingSenderId: '"356875498672"'
  },
  FIREBASE_VERSION: '"v0"'
}

module.exports = {
  build: {
    env: env
  },
  dev: {
    env: env
  }
}
```

Note the use of single *and* double quotes here - values are replaced as is by webpack.

When using `npm run dev` you can prpefix it with your projectID e.g. `projectID=example-project-id npm run dev`.
This will then load the relevant config file from the `config` dir.

## Firebase Functions

You will also need to deploy the firebase functions to enable user profile creation. When a new user is registered,
the function will create a user profile in the database, with default permissions.

```bash
cd functions
npm install
firebase deploy --only functions

```


## Frontend Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run develop
npm run productions

# build for production with minification
npm run buildDev
npm run buildProd

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
