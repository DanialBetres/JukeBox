'use strict';

process.env.DEBUG = 'actions-on-google:*';
const functions = require('firebase-functions'); // Cloud Functions for Firebase library
const App = require('actions-on-google').DialogflowApp; // Google Assistant helper library
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);
const plswork = admin.database().ref('people/')
{/* <script src="https://www.gstatic.com/firebasejs/4.1.3/firebase.js"></script> */}

// import Script from ('../test.js')

// var config = {
//     apiKey: "AIzaSyCWfDeoXue1YnVRZGXiy9q3M2A2-PknkbY",
//     authDomain: "nextup-9685a.firebaseapp.com",
//     databaseURL: "https://nextup-9685a.firebaseio.com",
//     projectId: "nextup-9685a",
//     storageBucket: "nextup-9685a.appspot.com",
//     messagingSenderId: "11444832309"
//   };
//   firebase.initializeApp(config);


const NUMBER_ARG = 'number';
exports.NextUp = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));
  function pause (app) {
      var x;
      admin.database().ref('people/' + 'teest').set({

          firstname:'hleo',
          lastname:'ssss'
      });
      admin.database().ref('people/test').once('value', snap => {
          x = snap.val();
          app.ask('the output from firebase is:' + x.firstname);
      })
    //   app.ask('the output from firebase is:' + x);
    //   const res = admin.child('test12');
    //   res.once('value', snap => {
    //       const yay = snap.val();
    //       console.log('it returns: ' + yay);
    //       app.ask(yay);
    //   })
    // app.ask("this is working");
    
    //   app.ask(request);
    //   firebase.database().ref('people/' + 'test15').set({
    //     firstname: 'hello',
    //     lastname: 'test12'
    // });
  
    //   app.ask(response);
      
  }
  
  function next (app) {
  	app.ask(request);
  	app.ask(response);
  }
  
  function play (app) {
  	app.ask(request);
  	app.ask(response);
  }
  
  function ranking (app) {
    let number = app.getArgument(NUMBER_ARG);
    app.ask(number);
  }
  
  function top (app) {
    let number = app.getArgument(NUMBER_ARG);
    app.ask(number);
  }
  
  let actionMap = new Map();
  actionMap.set('pause', pause);
  actionMap.set('next', next);
  actionMap.set('play', play);
  actionMap.set('ranking', ranking);
  actionMap.set('top', top);
  app.handleRequest(actionMap);
});

