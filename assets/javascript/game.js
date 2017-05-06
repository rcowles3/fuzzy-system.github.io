// On game load, computer will load a random number for user to guess, which will auto generate between 19 - 120, in which user will have to click crystal buttons to guess up to computer generated number. 
$(document).ready(function() {

    // VARIABLES 
    // ===============================================

    // Each randomly generated number from the crystal click will be between numbers 1 - 12. 
    var aquamarineAmnt = Math.floor((Math.random() * 12) + 1);
    var emeraldAmnt = Math.floor((Math.random() * 12) + 1);
    var diamondAmnt = Math.floor((Math.random() * 12) + 1);
    var amethystAmnt = Math.floor((Math.random() * 12) + 1);

    // Computer generates random number for user to guess to
    computerNumber = Math.floor((Math.random() * 121) + 19);

    console.log(computerNumber);

    // Wins and losses will both be reset/set to 0.
    var wins = 0;
    var losses = 0;

    // Create a variable for the added string of numbers.
    var clickNo = 0;

    // JQUERY FUNCTIONS 
    // ===============================================

    // Need to send number back into random number div
    $("#computerGuess").html(computerNumber);

    // Call to the functions to add each click of respective button and send to userguess html
    $("#aquamarine").click(function() {
        clickNo += aquamarineAmnt;
        console.log(aquamarineAmnt);
    });

    $("#emerald").click(function() {
        clickNo += emeraldAmnt;
        console.log(emeraldAmnt);
    });

    $("#diamond").click(function() {
        clickNo += diamondAmnt;
        console.log(diamondAmnt);
    });

    $("#amethyst").click(function() {
        clickNo += amethystAmnt;
        console.log(amethystAmnt);
    });

    // When each image is clicked, it will generate a random number, which will be hidden from the user. 
    $(".imgButtons").on("click", function() {

        $("#userGuess").html(clickNo);

        // The total of numbers added up are then compared to auto generated computer number. If the added up numbers equal up to the computer number, then user wins, and win counter will increase by 1. If added numbers added up more than computer number, user will lose, and loser counter will increase by 1.
        if (clickNo == computerNumber) {
            console.log(wins++);
            wins = wins++;
            $('#wins').html(wins);
            alert("You Win!")
            reset();

        } else if (clickNo >= computerNumber) {
            console.log(losses++);
            losses = losses++;
            $('#loss').html(losses);
            alert("You Lose, Try Again!")
            reset();
        }
    });

    // Function to reset user counter, and random numbers, and adding win/loss count. 
    function reset() {

    	// Reset user counter.
        clickNo = 0;

        // Reset will also randomize computer number and crystal variables as well. 
        computerNumber = Math.floor((Math.random() * 121) + 19);

        aquamarineAmnt = Math.floor((Math.random() * 12) + 1);

        emeraldAmnt = Math.floor((Math.random() * 12) + 1);

        diamondAmnt = Math.floor((Math.random() * 12) + 1);
        
        amethystAmnt = Math.floor((Math.random() * 12) + 1);


        // Need to send number back into random number div
        $("#computerGuess").html(computerNumber);

        // console.log("test");
    }
});
