var num;
var stack;
var nextMove;
var start = document.getElementById('start');
start.addEventListener("click", play);
var sourceDiv = document.getElementById("Source");
var targetDiv = document.getElementById("Target");
var auxDiv = document.getElementById("Aux")

function play(){
  setNum();
  src = [];
  stack = [];
  for (let i = 0; i<num; i++){
    src.push(i+1);
  }
  sourceDiv.innerHTML = "";
  targetDiv.innerHTML = "";
  auxDiv.innerHTML = "";
  draw();
  solve(sourceDiv,targetDiv,auxDiv,num);
  var loop = 0;
  var id = setInterval(function() {
    loop++;
    if(loop === Math.pow(2,num)-4)
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
var setNum = () => num = document.getElementsByName('number')[0].value;

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
