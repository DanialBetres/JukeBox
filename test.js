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

  var formData = 'test';;
  var num = 0;
  var SONG_ID = '';
  function myfunction(){
  	SONG_ID = document.getElementById('songid').value;
  	console.log(SONG_ID);
  	alert(SONG_ID);
  }
 
function addSong() {
	let song_id = Math.floor(Math.random() * 1000) + 1000
	let vote = Math.floor(Math.random() * 20) + 1
	firebase.database().ref('songs/').once('value').then(function(snapshot) {
    	var num = snapshot.numChildren();
    	if(num <= 9){
		firebase.database().ref('songs/'+ song_id).set({
			SongName:'random',
  			artist:'random',
  			time:'3:30',
  			picture:'jpg',
  			upvote: 'Empty',
  			votecount: vote
		})
	}
  	});
}

function removeSong() {
	SONG_ID = document.getElementById('songid').value;
	firebase.database().ref('songs/' + SONG_ID).remove()
	
}

// retrieve ALL song Info
function RetrieveSong() {
  let Song_ID = '123432' // INPUT THE SONG ID OF INTEREST 
  firebase.database().ref('songs/' + SONG_ID).once('value', snap => {
    console.log(snap.val());
  })

  firebase.database().ref('songs/').orderByChild('votecount').once('value', snap => {
    console.log(snap.val());
    let x = snap.val();
    // for(property in x){
    //   console.log(property);
    // }

    for(var propName in x) {
    if(x.hasOwnProperty(propName)) {
        var propValue = x[propName];
        console.log(propValue);
        // do something with each element here
    }
}
  })
}

function returnOrder() {
	
}


function OrderedSongs(){
  let orderedlist = [];
  firebase.database().ref('songs/').orderByChild('votecount').once('value', snap => {
    console.log(snap.val());
  })

  // firebase.database().ref("songs").orderByValue
  firebase.database().ref('songs/').once('value', snap => {
    console.log(snap.val());
  })
}

// DOWN VOTE SONG
function DecrementVote(){
  	SONG_ID = document.getElementById('songid').value;
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
    	SONG_ID = document.getElementById('songid').value;
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
