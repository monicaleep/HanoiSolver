var num;
var nextMove;
var $start = $('#start');
var $source = $("#Source");
var $target = $("#Target");
var $aux = $("#Aux");


$start.on("click",function(){
  $('.disc').remove();
  num = $('#number').val();
  for(let i = 0; i<num; i++){
    var disc = $("<div></div>");
    disc.attr('class',"disc");
    disc.attr('id','d'+(i+1));
    disc.css('width',(i+1)*20+"px");
    disc.css('top',361-(num-i-1)*15);
    disc.css('height',"15px");
    disc.css('background-color',getRanC());
    $source.append(disc);

  }
});




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

function move(from,to){
//  console.log(from)
    console.log("from: " + from.id + "  to:  " + to.id)
    to.insertBefore(from.childNodes[0],to.firstChild);

}
//draw the disks onto the source div
function draw(){
  for (let i = 0; i<num;i++){
    piece = document.createElement("div");
    piece.className = "piece"
    piece.style.width = (i+1)*22 + "px";
    piece.style.height = (i+1)*22 + "px";
    sourceDiv.appendChild(piece);
  }
}

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

function getRanC() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
}
