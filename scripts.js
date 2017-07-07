var num;
var $start = $('#start');
var $source = $("#Source");
var $aux = $("#Aux");
var $target = $("#Target");
var movesCount;

$start.on("click",function(){
  $('.disc').remove();
  draw();
  if (num%2 === 0){
    $target = $("#Aux");
    $aux = $("#Target");
  }
  movesCount=0;
  legalMove($source,$target);
  legalMove($source,$aux);
  legalMove($target,$aux);
  legalMove($source,$target);
  legalMove($aux,$target);
  legalMove($target,$source);
  legalMove($aux,$target);
  legalMove($source,$target);
});

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
  //you have to compare lengths
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
  alert("an error has occurred")
}
function move(fromDiv,toDiv){
  var toId = toDiv.attr('id')
  var disksOnTarget = $('#'+ toId+ ' .disc').length;
  var newTop = (361 - disksOnTarget*15) + "px";
  var diskToMove = $('#' + fromDiv.attr('id') + ' .disc')[0];
  //console.log(parseInt(diskToMove.style.width,10));
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
    disc.css('width',(i+1)*20+"px");
    disc.css('top',361-(num-i-1)*15);
    disc.css('height',"15px");
    disc.css('background-color',getRanC());
    //console.log(disc);
    $source.append(disc);
  }
}

//helper function to get a random color for each disk
function getRanC() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
}


/**
//get number of disks from user
var setNum = () => num = $('#number').val();


function solve(source, target, auxi, n){
    if (n>0){
      //console.log(source.innerHTML)
      solve(source, auxi, target, n-1);
      //console.log(source.childNodes[0])
      stack.push([source,target]);
      //target.push(source.pop()); //make this work for .divs.
      solve(auxi, target, source, n-1);
    }
}

function move(from,to){
//  console.log(from)
    console.log("from: " + from.id + "  to:  " + to.id)
    to.insertBefore(from.childNodes[0],to.firstChild);
}

function play(){
  setNum();
  stack = [];
  sourceDiv.innerHTML = "";
  targetDiv.innerHTML = "";
  auxDiv.innerHTML = "";
  draw();
  solve(sourceDiv,targetDiv,auxDiv,num);
  var loop = 0;
  var id = setInterval(function() {
    loop++;
    if(loop === Math.pow(2,num)-1)
    {
        clearInterval(id);
    }
    //console.log(loop)
    move(stack[loop-1][0],stack[loop-1][1])
}, 1000);
  //for (let i=0;i<stack.length;i++){
//    move(stack[i][0],stack[i][1]);
//  }
}
**/
