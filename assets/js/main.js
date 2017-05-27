// Psudeo Code
// Step 1: Create HTML markup and link neccesary libraries
// Step 2: Create firebase database, and link to app
// Step 3: When user fills out form, information will be sent to firebase database upon form submission.
// Step 4: Create a function that will render html to page when the value in DB is modified. 
// Step 5: Need to create a function off the frequency value, taht will calculate next arrival time and minutes away based off initial loaded variables.

$(document).ready(function() {


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCzvOVZ1SzglffrC5bFPVZsw4dMx6L_66A",
        authDomain: "train-scheduler-a202c.firebaseapp.com",
        databaseURL: "https://train-scheduler-a202c.firebaseio.com",
        // projectId: "train-scheduler-a202c",
        storageBucket: "train-scheduler-a202c.appspot.com",
        // messagingSenderId: "323632345024"
    };
    // Calling config file for firebase
    firebase.initializeApp(config);

    // VARIABLES 
    // ===============================================

    // Need to create variables to set user validation type on form, and set variables to load on page initially
    var trainName = "Thomas";
    var trainDestination = "Seattle";
    var trainFrequency = 10;

    // // Variables to hold moment calculations
    var firstTrainTime = moment().minutes();
    var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted._i), "minutes");
    var tRemainder = diffTime % trainFrequency;
    var minutesTillTrain = trainFrequency - tRemainder;
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    var nextTrainFormatted = moment(nextTrain).format("hh:mm");
    var trainFrequencyInput = $('#addTrainFrequency').val().trim();


    // Variable to reference firebase DB.
    var database = firebase.database();

    // FUNCTIONS 
    // ===============================================

    // Start screen function to populate first train
    function startScreen() {
        $('#displayTrainName').append(trainName + "<br>");
        $('#displayTrainDestination').append(trainDestination + "<br>");
        $('#displayTrainFrequency').append(trainFrequency + "<br>");
        $('#displayNextArrival').append(nextTrainFormatted + "<br>");
        $('#displayMinsAway').append(minutesTillTrain + "<br>");

    }

    startScreen();

    // Click event to handle form submission
    $('#addTrainBtn').click(function() {

        // Method to prevent form from running on its own
        event.preventDefault();

        // Get input values
        trainName = $('#addTrainName').val().trim();
        trainDestination = $('#addTrainDestination').val().trim();
        // firstTrain = $('#addFirstTrainTime').val().trim();
        trainFrequency = $('#addTrainFrequency').val().trim();
        nextArrival = $('#addTrainTime').val().trim();

        // Test to make sure input is retreived
        // console.log(trainName, trainDestination, firstTrain, trainFrequency);    

        // Push input data to firebase database
        database.ref().push({
            trainName: trainName,
            trainDestination: trainDestination,
            trainFrequency: trainFrequency,
            addTrainTime: nextArrival,
            minutesAway: minutesTillTrain
        });

        frequencyLogic();

        console.log(nextArrival);

        // Reset form after submit
        $('form').get(0).reset();

    });

    // Function to calculate moment.js logic for train frequency
    function frequencyLogic() {
        // Variables to hold moment calculations
        firstTrainTime = moment().minutes();
        firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
        diffTime = moment().diff(moment(firstTimeConverted._i), "minutes");
        tRemainder = diffTime % trainFrequencyInput;
        minutesTillTrain = trainFrequencyInput - tRemainder;
        nextTrain = moment().add(minutesTillTrain, "minutes");
        nextTrainFormatted = moment(nextTrain).format("hh:mm");

        // Manipulate HTML to page
        $('#displayNextArrival').append(nextArrival + "<br>");
        $('#displayMinsAway').append(minutesTillTrain + "<br>");
    }

    // Watcher function to check if value in firebase database has changed, if so, render html to page. 
    database.ref().on("child_added", function(snapshot) {

        // Render snapshot data to html
        $('#displayTrainName').append(snapshot.val().trainName + "<br>");
        $('#displayTrainDestination').append(snapshot.val().trainDestination + "<br>");
        $('#displayTrainFrequency').append(snapshot.val().trainFrequency + "<br>");
        // $('#displayNextArrival').append(nextArrival + "<br>");
        // $('#displayMinsAway').append(minutesTillTrain + "<br>");

        frequencyLogic();

    });

});
