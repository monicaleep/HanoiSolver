var num;

var start = document.getElementById('start');
start.addEventListener("click", play);
var sourceDiv = document.getElementById("Source");
var targetDiv = document.getElementById("Target");
var auxDiv = document.getElementById("Aux")

function play(){
  setNum();
  src = [];
  for (let i = 0; i<num; i++){
    src.push(i+1);
  }
  sourceDiv.innerHTML = "";
  targetDiv.innerHTML = "";
  auxDiv.innerHTML = "";
  draw();
  solve(sourceDiv,targetDiv,auxDiv,num);

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
      target.appendChild(source.childNodes[0]);
      //target.push(source.pop()); //make this work for .divs.
      solve(auxi, target, source, n-1);
    }
    //console.log("source: "+sourceDiv.innerHTML + "aux: " + auxDiv.innerHTML + "target: "+ targetDiv.innerHTML + "n:  " + n)
  }
}
