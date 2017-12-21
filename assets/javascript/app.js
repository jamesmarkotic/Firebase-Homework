// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. Create a way to calculate the next arrival and minutes away.


//Initialize Firebase
  var config = {
    apiKey: "AIzaSyCwrx9wpoITbYsn1OXBcmvhPI32bJvFeuE",
    authDomain: "train-time-f8060.firebaseapp.com",
    databaseURL: "https://train-time-f8060.firebaseio.com",
    projectId: "train-time-f8060",
    storageBucket: "train-time-f8060.appspot.com",
    messagingSenderId: "918522608673"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //Button for adding train info to database
$("#add-train").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#inputTrain").val().trim();
  var dest = $("#inputDest").val().trim();
  var firstTrain = moment($("#inputTime").val().trim(), "HH:mm").format("X");
  var freq = $("#inputFreq").val().trim();

  //Holding train data
  var newTrain = {
    train: trainName,
    destination: dest,
    first: firstTrain,
    frequency: freq
  };

  database.ref().push(newTrain);

  //Clearing inputs
  $("#inputTrain").val("");
  $("#inputDest").val("");
  $("#inputTime").val("");
  $("#inputFreq").val("");

});

//Create Firebase event for adding trains to the database and page (Manually creating table elements in JS)
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  //Store everything into a variable.
  var trainName = childSnapshot.val().train;
  var dest = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().first;
  var freq = childSnapshot.val().frequency;


  //Converting value to readable time
  var nextTrainPretty = moment.unix(firstTrain).format("HH:mm");

  // Pseudo Coding of whats left to do
  // 1. Need to do the math for finding next arrival
  // 2. For Minutes away find the time difference between
  // the current moment and next arrival
  // 3. Store results of both of these and display to page with line of code below


  //Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + dest + "</td><td>" +
  freq + "</td><td>" + nextTrainPretty + "</td><td>" + freq + "</td></tr>");
});
