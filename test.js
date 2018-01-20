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
 function ok(){

  firebase.database().ref('people/' + 'test12').set({
      firstname: 'hello',
      lastname: 'test12'
  });
}

firebase.database().ref('people/' ).once('value').then(function (snapshot) {

  console.log(snapshot.val());
})

