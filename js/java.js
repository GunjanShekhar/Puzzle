function btnvisible(){
  document.getElementById("chngpic").style.display = "none";
}
//window.onload= btnvisible;

function swapTiles(cell1,cell2) {
    var temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;
    setPuzzle();
}

function togglePopup(){
  document.getElementById("win").classList.toggle("active");
}

var img=0;
var bgImg=["url(img/1to16.jpg)", "url(img/monalisa.jpg)","url(img/pic3.jpg)","url(img/pic4.jpg)","url(img/pic5.jpg)","url(img/scene2.jpg)"];


function changePuzzle(){
  img=(img==0)?1:0;
  setPuzzle();
  shuffle();
  if(img==0){
    document.getElementById("changebtn").src="img/button2.png";
  }
  else{
    document.getElementById("changebtn").src="img/button3.png";
  }
  var x = document.getElementById("chngpic");
  if (x.style.display === "none") {
    x.style.display = "inline-block";
  } 
  else {
    x.style.display = "none";
  }
  shuffle();
}

function changePicture(){
  if(img<5){
    img++;
  }
  else{
    img=1;
  }
  shuffle();
  setPuzzle();
}

function setPuzzle(){
  var count=0;
  for(var row=1;row<=4;row++){
    for(var col=1;col<=4;col++){
      count=(row-1)*4+col;
      var targetTile=document.getElementsByClassName("tile"+count);
      targetTile[0].style.background=bgImg[img];
      if(window.matchMedia("(max-width: 1000px)").matches){
        var x=(-1)*(row-1)*80;
        var y=(-1)*(col-1)*80;
        targetTile[0].style.backgroundSize="320px 320px";
        targetTile[0].style.backgroundPosition=x+"px "+y+"px";
      }
      else{
        var x=(-1)*(row-1)*120;
        var y=(-1)*(col-1)*120;
        targetTile[0].style.backgroundSize="480px 480px";
        targetTile[0].style.backgroundPosition=x+"px "+y+"px";
      }
    }
  }
  targetTile=document.getElementsByClassName("tile16");
  targetTile[0].style.background="white";
}
  
function shuffle() {
  //Use nested loops to access each cell of the 3x3 grid
  for (var row=1;row<=4;row++) { //For each row of the 3x3 grid
    for (var column=1;column<=4;column++) { //For each column in this row
    
      var row2=Math.floor(Math.random()*4 + 1); //Pick a random row from 1 to 3
      var column2=Math.floor(Math.random()*4 + 1); //Pick a random column from 1 to 3
       
      swapTiles("cell"+row+column,"cell"+row2+column2); //Swap the look & feel of both cells
    } 
  } 
  setInitials();
}

  var min=0;
  var sec=0;
  var move=0;
  var timeVar;

  function setInitials(){
    min=0;
    sec=0;
    document.getElementById("minutes").textContent=0;
    document.getElementById("seconds").textContent=0;
    document.getElementById("moves").textContent=0;
    move=0;
    timer();
    clearInterval(timeVar);
    timeVar=setInterval("timer()",1000);
  }

  function timer(){
    sec++;
    if(sec>=60){
      min++;
      sec=sec-60;
    }

    var tmp;

    tmp=min;
    min=(min<10)?"0"+min:min;
    document.getElementById("minutes").textContent=min;
    min=tmp;

    tmp=sec;
    sec=(sec<10)?"0"+sec:sec;
    document.getElementById("seconds").textContent=sec;
    sec=tmp;

  }

  function movecount(){
    move++;
    document.getElementById("moves").textContent=move;
  }
  
  function win(){
    var flag=1;
    for(var row=1;row<=4;row++){
      for(var column=1;column<=4;column++){
        if(document.getElementById("cell"+row+column).className!="tile"+((row-1)*4+column)){
          flag=0;
        }
      }
    }
    if(flag==1){
      togglePopup();
    }
  }

  function clickTile(row,column) {
    var cell = document.getElementById("cell"+row+column);
    var tile = cell.className;
    if (tile!="tile16") { 
         //Checking if white tile on the right
         if (column<4) {
           if ( document.getElementById("cell"+row+(column+1)).className=="tile16") {
             if( document.getElementById("cell"+row+column).classList!="right")
             {
              document.getElementById("cell"+row+column).classList.add("right");
              setTimeout(function(){
               document.getElementById("cell"+row+column).classList.remove("right");
              },50);
             }
             swapTiles("cell"+row+column,"cell"+row+(column+1));
             movecount();
             win();
             return;
           }
         }
         //Checking if white tile on the left
         if (column>1) {
           if ( document.getElementById("cell"+row+(column-1)).className=="tile16") {
            if( document.getElementById("cell"+row+column).classList!="left")
             {
              document.getElementById("cell"+row+column).classList.add("left");
              setTimeout(function(){
               document.getElementById("cell"+row+column).classList.remove("left");
              },50);
             }
             swapTiles("cell"+row+column,"cell"+row+(column-1));
             movecount();
             win();
             return;
           }
         }
           //Checking if white tile is above
         if (row>1) {
           if ( document.getElementById("cell"+(row-1)+column).className=="tile16") {
            if( document.getElementById("cell"+row+column).classList!="up")
             {
              document.getElementById("cell"+row+column).classList.add("up");
              setTimeout(function(){
               document.getElementById("cell"+row+column).classList.remove("up");
              },50);
             }
             swapTiles("cell"+row+column,"cell"+(row-1)+column);
             movecount();
             win();
             return;
           }
         }
         //Checking if white tile is below
         if (row<4) {
           if ( document.getElementById("cell"+(row+1)+column).className=="tile16") {
            if( document.getElementById("cell"+row+column).classList!="down")
             {
              document.getElementById("cell"+row+column).classList.add("down");
              setTimeout(function(){
               document.getElementById("cell"+row+column).classList.remove("down");
              },50);
             }
             swapTiles("cell"+row+column,"cell"+(row+1)+column);
             movecount();
             win();
             return;
           }
         } 
    }
  }
  
  
  
  