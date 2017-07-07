var num;
var $start = $('#start');
var $source = $("#Source");
var $aux;
var $target;
var movesCount;
var maxMoves;
var intervalId;
const BAR_TOP =($(".bar").offset().top)-15;

$start.on("click",function(){
  if (intervalId){
    return;
  }
  $('.disc').remove();
  draw();
  maxMoves = Math.pow(2,num) -1;
  $aux = $("#Aux");
  $target = $("#Target");
  if (num%2 === 0){
    $target = $("#Aux");
    $aux = $("#Target");
  }
  movesCount=0;
  intervalId = setInterval(function(){
    if(movesCount < maxMoves){
      makeMoves();
    }
    else{
      clearInterval(intervalId);
      intervalId = null;
      movesCount = 0;
    }
  }, 600)
});


function makeMoves(){
  if (movesCount%3 === 0){
    legalMove($source,$target);
  }
  if (movesCount%3 === 1){
    legalMove($source,$aux);
  }
  if (movesCount%3 ===2){
    legalMove($target,$aux);
  }
  movesCount++;
}



//check for a legal move, then make that move!
function legalMove(divA,divB){
  var diskOnA = $('#' + divA.attr('id') + ' .disc')[0];
  var diskOnB = $('#' + divB.attr('id') + ' .disc')[0];
  //no disk on divB
  if (diskOnA && !diskOnB){
    move(divA,divB);
    return;
  }
  //no disk on divA
  else if (!diskOnA && diskOnB){
    move(divB,divA);
    return;
  }
  //If both discs exist, you have to compare lengths
  var lenA = parseInt(diskOnA.style.width,10);
  var lenB = parseInt(diskOnB.style.width,10);
  if (lenA < lenB){
    move(divA,divB);
    return
  }
  else{
    move(divB,divA);
    return;
  }
  alert("an error has occurred");
  return;
}

function move(fromDiv,toDiv){
    var toId = toDiv.attr('id')
    var disksOnTarget = $('#'+ toId+ ' .disc').length;
    var newTop = (BAR_TOP - disksOnTarget*15) + "px";
    var diskToMove = $('#' + fromDiv.attr('id') + ' .disc')[0];
    console.log($('#' + fromDiv.attr('id') + ' .disc').first())
    diskToMove.style.top = newTop;
    toDiv.prepend(diskToMove);
}

//draw the disks onto the source div
function draw(){
  num = $('#number').val();
  for(let i = 0; i<num; i++){
    var disc = $("<div></div>");
    disc.attr('class',"disc");
    disc.attr('id','d'+(i+1));
    disc.css({ 'width': (i+1)*20+"px" , 'top': BAR_TOP-(num-i-1)*15 , 'height': "15px", 'background-color': getRanC()});
    disc.hide().appendTo($source).fadeIn("slow");
  }
}

//helper function to get a random color for each disk
function getRanC() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
}
