var started = false;
var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$("#level-title").on("click", function() {
    if (!started) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
});

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
    
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    var clickedButton = $("#" + currentColour);
    
    clickedButton.addClass("pressed");
    setTimeout(() => {
        clickedButton.removeClass("pressed");
    }, 200);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 500);

        }
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 150);

        $("#level-title").text("Game Over, Tap Here to Restart");
        startOver();

    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}