// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase:  {
    apiKey: 'AIzaSyDAZdJ7CRiUD87Yc0mseKuWchs0F8sNItc',
    authDomain: 'film-en-folie.firebaseapp.com',
    databaseURL: 'https://film-en-folie.firebaseio.com',
    projectId: 'film-en-folie',
    storageBucket: 'film-en-folie.appspot.com',
    messagingSenderId: '617333302234'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
