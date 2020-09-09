//click start button
var playing = false;
var score;
var hp;
var fruits = ['apple', 'banana', 'cherry', 'grape', 'melon', 'pear', 'pineapple', 'watermelon', 'yusu'];
var step;
var action;
  $(function(){
    $("#start-reset").click(function(){
      //are we playing
      //playing
      if (playing){
        //reload
        location.reload();
      }
      //not playing
      else{
        //hide gameover for restart
        $('#gameOver').hide();
        //you're playing
        playing = true;
        //set score to 0
        score = 0;
        $('#score-value').html(score);
        //show hp
        $('#hp').show();
        hp = 3;
        addHearts();
        //change text to reset game
        $('#start-reset').html("Reset Game");
        //Game
        startAction();
      }
    });
  });

function addHearts(){
  $('#hp').empty();
  for(i = 0; i < hp; i++){
    $('#hp').append('<img src="img/heart.png" class="life">');
  }
}

function  startAction(){
  $('#fruit1').show();
  //Choose sprite
  chooseFruit();
  //1.create random fruit
  $('#fruit1').css({'left': Math.round(500 * Math.random()), 'top': -100});
  //1,5.define random step
  step = 1 + Math.round(4 * Math.random());
  //2.move fruit down by 1 step every 10 ms
  action = setInterval(function(){
    $('#fruit1').css('top', $('#fruit1').position().top + step);
    //fruit too low
    if ($('#fruit1').position().top > $('#fruitContainer').height()){
      if (hp > 0)
      {
        //generate fgruit
        $('#fruit1').show();
        //choose fruit
        chooseFruit();
        //get fruit
        $('#fruit1').css({'left': Math.round(500 * Math.random()), 'top': -100});
        //generate step
        step = 1 + Math.round(4 * Math.random());
        //reduce hp
        hp--;
        addHearts();
      }
      else{
        gameOver();
      }
    }
  }, 10);
}
$('#fruit1').click(function(){
  score++;
  //play sound
  $('#score-value').html(score);
  //document.getElementById("slice-sound").play();
  $('#slice-sound')[0].play();
  //stop fruit
  clearInterval(action);
  //hide fruit
  $('#fruit1').hide("explode", 500);
  //send new fruit
  setTimeout(startAction, 500);
});
//slice Fruits
  //play sound
  //explode fruit
function chooseFruit(){
  var i = Math.round(8 * Math.random())
  $('#fruit1').attr('src', 'img/' + fruits[i] + '.png');
}

function gameOver(){
  playing = false;
  $('#start-reset').html("Start Game");
  $('#gameOver').show();
  $('#gameOver').html('<p>Game Over!</p><p>Your score is ' + score + '</p>');
  $('#hp').hide();
  //stop coroutine
  stopAction();
}

function stopAction(){
  clearInterval(action);
  $('#fruit1').hide();
}
