{/* <script src="https://www.gstatic.com/firebasejs/4.9.0/firebase.js"></script> */}
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCWfDeoXue1YnVRZGXiy9q3M2A2-PknkbY",
    authDomain: "nextup-9685a.firebaseapp.com",
    databaseURL: "https://nextup-9685a.firebaseio.com",
    projectId: "nextup-9685a",
    storageBucket: "nextup-9685a.appspot.com",
    messagingSenderId: "11444832309"
  };
  firebase.initializeApp(config);


  // var database = firebase.database();

  var formData = 'test';
  let SONG_ID = '123432';
  
 function ok(){

//   firebase.database().ref('people/' + 'test12').set({
//       firstname: 'hello',
//       lastname: 'test12'
//   });
// }

// let upvote='12nlhul8n';
let user_id = 'test1234';
let user_id2 = 'test12345';
let pictureAddress = "jpg";

firebase.database().ref('songs/' + SONG_ID).set({
  SongName:'baby',
  artist:'justin beiber',
  time:'3:30',
  picture:'jpg',
  upvote:'USER_ID',
  downvote:'',
  votecount:0
})

// firebase.database().ref('songs/' + SONG_ID.child()

// firebase.database().ref('songs/' + SONG_ID + '/' + upvote).child('testtt').setValue(
//   "HOW DOES THIS WORK"
// )

firebase.database().ref('songs/' + SONG_ID + '/upvote').child(user_id).set(
 pictureAddress
)

firebase.database().ref('songs/' + SONG_ID + '/upvote').child(user_id).set(true)

// 
firebase.database().ref('songs/' + SONG_ID + '/upvote').child(user_id2).set('YAYYY')


 }

// retrieve ALL song Info
function RetrieveSong() {
  let Song_ID = 121341 // INPUT THE SONG ID OF INTEREST 
  firebase.database().ref('songs/' + SONG_ID).once('value', snap => {
    console.log(snap.val());
  })
}


// DOWN VOTE SONG
function DecrementVote(){
  
    const user_id3 = '4314';

    firebase.database().ref('songs/' + SONG_ID + '/upvote/' + user_id3).once('value', snap => {
      let curr = snap.val()

      if(curr===true){
          console.log('nonregistered');
          firebase.database().ref('songs/' + SONG_ID + '/upvote').child(user_id3).set(false)
          firebase.database().ref('songs/' + SONG_ID + '/votecount').transaction(function(currentVote) {
          var newValue = currentVote -2;
          return newValue;
        })
      } else if (curr === false) {
        firebase.database().ref('songs/' + SONG_ID + '/upvote').child(user_id3).set(null)
        
        firebase.database().ref('songs/' + SONG_ID + '/votecount').transaction(function(currentVote) {
          var newValue = currentVote + 1;
          return newValue;
        })
      } else {
        firebase.database().ref('songs/' + SONG_ID + '/upvote').child(user_id3).set(false)
        firebase.database().ref('songs/' + SONG_ID + '/votecount').transaction(function(currentVote) {
        var newValue = currentVote -1;
        return newValue;
      }) 
      }
    })
  }

// UP VOTE SONG
  function IncrementVote(){
    
      const user_id3 = '4314';
  
      firebase.database().ref('songs/' + SONG_ID + '/upvote/' + user_id3).once('value', snap => {
        let curr = snap.val()
  
        if(curr===false){
            console.log('nonregistered');
            firebase.database().ref('songs/' + SONG_ID + '/upvote').child(user_id3).set(true)
            firebase.database().ref('songs/' + SONG_ID + '/votecount').transaction(function(currentVote) {
            var newValue = currentVote + 2;
            return newValue;
          })
        } else if(curr ===true) {
          firebase.database().ref('songs/' + SONG_ID + '/upvote').child(user_id3).set(null)
          
          firebase.database().ref('songs/' + SONG_ID + '/votecount').transaction(function(currentVote) {
            var newValue = currentVote - 1;
            return newValue;
          })

        } else {
          firebase.database().ref('songs/' + SONG_ID + '/upvote').child(user_id3).set(true)
          firebase.database().ref('songs/' + SONG_ID + '/votecount').transaction(function(currentVote) {
          var newValue = currentVote + 1;
          return newValue;
        })
        }
      })
    }