'use strict';

process.env.DEBUG = 'actions-on-google:*';
const functions = require('firebase-functions'); // Cloud Functions for Firebase library
const App = require('actions-on-google').DialogflowApp; // Google Assistant helper library
const admin = require('firebase-admin')
const SpotifyWebApi = require('spotify-web-api-node');
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// var s = new Spotify();
var redirect_uri = 'http://localhost:8888/callback';
var spotifyApi = new SpotifyWebApi({
  clientId: '05cc0a26038c4d7a9ed08acb268b8501',
  clientSecret: 'bf06119abcd444639c415c3f09579bb0 ',
  redirectUri: 'http://localhost:8888/callback'
});
spotifyApi.setAccessToken('BQCZma815UpbmqLFfcrJ5zbsFysgmmUZR_Ts8u_eEIwoQ0vD1z7kB4gRMGG-GYSZOBHlSuwSTS7NoyGMvKsfgxnIEsQo954NZDey5ZJbJ-Xp75Bi-7VEoMfOay6_xJs8GyNY8AqC8wZsHQ');



// var spotifyApi = new SpotifyWebApi();
// spotifyApi.clientCredentialsGrant().then(function(data) {
//   console.log('the access token expires in' + data.body['expires_in']);
//   console.log('the access token is' + data.body['access_token']);
// }, function(err) {
//     console.log('Something went wrong when retrieving an access token', err.message);
//   });
  


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

/*function OrderedSongs(){
  let orderedlist = [];
  admin.database().ref('songs/').once('value', snap => {
    orderedlist = Object.values(snap.val());
    orderedlist.sort(function(a,b) {
      return b.votecount - a.votecount;
    })
  })
  return orderedlist;
}
*/

const NUMBER_ARG = 'number';
exports.NextUp = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));
  function pause (app) {
spotifyApi.searchTracks('love').then(function(data) {
  var x = data.body.tracks.items[0].name;
  app.ask(x);
})
      // var x;
      // admin.database().ref('people/' + 'teest').set({

      //     firstname:'hleo',
      //     lastname:'ssss'
      // });
      // admin.database().ref('people/test').once('value', snap => {
      //     x = snap.val();
      //     app.ask('the output from firebase is:' + x.firstname);
      // })
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
  	app.ask("Skipping to the next song");
  }
  
  function play (app) {
  	app.ask("Playing");
  }

  function add (app) {
    var x = app.getRawInput();
   var toIndex =  x.indexOf('by');

   var  songname = x.substring(4,toIndex-1);
   var artist = x.substring(toIndex+2,x.length);
  var songId;
  var SongName;
  var song;
  var picture;
  var artists;
  var time;
  var upvote;
  var uri;
  var votecount;

   spotifyApi.searchTracks(songname).then(function(data) {
    song = data.body.tracks.items[0];
    SongName = song.name;
    artists = song.artists;
    picture = song.album.images[0];
    songId = song.id;
    time = song.duration_ms;
    upvote = 'Empty';
    uri = song.uri;
    votecount = 0;
    WritetoDatabase();

   })
function WritetoDatabase(){
    admin.database().ref('songs/' + songId).set({
      SongName: SongName,
      artist: artists,
      picture: picture,
      songId: songId,
      time: time,
      upvote: upvote,
      uri: uri,
      votecount: votecount
    });
   
  }
    app.ask( "song name: " + songname + ", artist:" + artist + "    " + songId);
}
function upvote(app){
  let number = app.getArgument(NUMBER_ARG);
  let n = parseInt(number);
  
  let orderedlist = [];
  admin.database().ref('songs/').once('value', snap => {
    let x = snap.val();
    orderedlist = Object.keys(x).map(function (key) {
      return x[key];
    });
    orderedlist.sort(function(a,b) {
        return b.votecount - a.votecount;
    })
    if(n <= orderedlist.length){
      let req_id = orderedlist[n - 1].songId;
      admin.database().ref('songs/' + req_id + '/votecount').once('value', snap => {
          let curr = snap.val()
        admin.database().ref('songs/' + req_id + '/votecount').transaction(function(currentVote) {
            var newValue = currentVote + 1;
            return newValue;
        })
      }
  )}
    else{
      app.ask('There are only ' + orderedlist.length + ' songs');
    }
   }
   )
   app.ask('Upvoted!');
 }

 
 function downvote(app){
  let number = app.getArgument(NUMBER_ARG);
  let n = parseInt(number);
  
  let orderedlist = [];
  admin.database().ref('songs/').once('value', snap => {
    let x = snap.val();
    orderedlist = Object.keys(x).map(function (key) {
      return x[key];
    });
    orderedlist.sort(function(a,b) {
        return b.votecount - a.votecount;
    })
    if(n <= orderedlist.length){
      let req_id = orderedlist[n - 1].songId;
      admin.database().ref('songs/' + req_id + '/votecount').once('value', snap => {
          let curr = snap.val()
        admin.database().ref('songs/' + req_id + '/votecount').transaction(function(currentVote) {
            var newValue = currentVote - 1;
            return newValue;
        })
      }
  )}
    else{
      app.ask('There are only ' + orderedlist.length + ' songs');
    }
   }
   )
   app.ask('Downvoted!');
}

function ranking (app) {
    let number = app.getArgument(NUMBER_ARG);
    let n = parseInt(number);
    
    let orderedlist = [];
  	admin.database().ref('songs/').once('value', snap => {
  	let x = snap.val();
    orderedlist = Object.keys(x).map(function (key) {
    	return x[key];
    });
    orderedlist.sort(function(a,b) {
      return b.votecount - a.votecount;
    })
    if(n <= orderedlist.length){
    	app.ask('the song is: ' + orderedlist[n - 1].SongName + ' by ' + ((orderedlist[n - 1].artist[0]).name));
    }
    else{
    	app.ask('There are only ' + orderedlist.length + ' songs');
    }
  })
  }
  
  function top (app) {
    let number = app.getArgument(NUMBER_ARG);
    let n = parseInt(number);
    
    let orderedlist = [];
  	admin.database().ref('songs/').once('value', snap => {
  	let x = snap.val();
    orderedlist = Object.keys(x).map(function (key) {
    	return x[key];
    });
    orderedlist.sort(function(a,b) {
      return b.votecount - a.votecount;
    })
    if(n <= orderedlist.length){
    	let song_list = []
      let artist_list = []
      let vote_count = []
    	for(let i=0; i<n; i++){
    		song_list.push(orderedlist[i].SongName)
        artist_list.push(orderedlist[i].artist[0].name)
        vote_count.push(orderedlist[i].votecount);
    	}
    	
    	let songs = '';
    	for(let t=0; t<n; t++){
    		songs += song_list[t] + ' by ' + artist_list[t] + ': ' + vote_count[t] + ' votes, ';
    	}
    	app.ask('Here are the top '+ n +' songs: ' + songs);
    }
    else{
    	app.ask('There are only ' + orderedlist.length + ' songs');
    }
  })
  }
  
  function quit (app) {
    app.tell("Closing");
  }
  
  let actionMap = new Map();
  actionMap.set('pause', pause);
  actionMap.set('next', next);
  actionMap.set('play', play);
  actionMap.set('ranking', ranking);
  actionMap.set('top', top);
  actionMap.set('quit', quit);
  actionMap.set('add',add);
  actionMap.set('upvote', upvote);
  actionMap.set('downvote', downvote);
  app.handleRequest(actionMap);
});

