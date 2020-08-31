
var buttonColours=["red","blue","green","yellow"];
var level=0;
var gamePattern=[];
var userClickPattern=[];
var started=false;
function nextSequence(){
  var randomNumber=Math.random();
  randomNumber=Math.floor(randomNumber*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("h1").html("level "+level);
  level++;
  userClickPattern=[];
  }
$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickPattern.length-1);
});
function playSound(name){
  var audio=new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

$(document).keypress(function(){
  if (!started) {
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
}});
function checkAnswer(currentLevel){

    if (gamePattern[currentLevel]==userClickPattern[currentLevel]){
      console.log("success");
      if (userClickPattern.length==gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }

  else {
    console.log("wrong");
    playSound("wrong")
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 500);
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
