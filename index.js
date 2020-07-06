let buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
let level = 1;
let started = false;

// works
function nextSequence(){
    userClickedPattern = [];
    level++;
    let randomNumber = Math.floor((Math.random() * 4));

    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound("sounds/" + randomChosenColor + ".mp3");
}

// works rights
$(".btn").click (function (event){
    let userChosenColor = event.target.id;
    pressAnimate(this);
    userClickedPattern.push(userChosenColor);
    playSound("sounds/" + userChosenColor + ".mp3");

    //check answer
    checkAnswer(userClickedPattern.length - 1);
});

// works right
function playSound(name) {
    let audio = new Audio(name);
    audio.play();
}

// works right
function pressAnimate(currentColor){
    $(currentColor).addClass("pressed");
    setTimeout(function (){
        $(currentColor).removeClass("pressed");
    }, 200);
}

//works 
$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
            },1000)
        }
    } else {
        playSound("sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key To Restart");
        startOver();
    }
}

function startOver() {
    level = 1;
    gamePattern = [];
    started = false;
}