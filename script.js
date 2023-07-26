let tanks = [];
var pressedKeys = {};
window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }

function update(){
  canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var canvasW = canvas.width;
  var canvasH = canvas.height;
  var  context = canvas.getContext('2d');
  context.fillStyle = "rgb(206, 206, 206)";
  context.fillRect(0, 0, canvasW, canvasH-1);
  for (var i=0; i<tanks.length; i++){
    var tank = tanks[i];
    circle(tank.x, tank.y, tank.size, "gray", context);
    circle(tank.x, tank.y, tank.size*0.9, tank.color, context);
    tank.x+=tank.vx;
    tank.y+=tank.vy;
  }
  multiLinedText(["Controls:", "WASD - Move around"], 0, 25, context, "black", 20, "arial");
  if (pressedKeys[68]&&playerTank.vx<=10){
    playerTank.vx+=1;
  }else if (pressedKeys[65]&&playerTank.vx>=-10){
    playerTank.vx-=1;
  }else{
    playerTank.vx-=Math.sign(playerTank.vx);
  }
  if (pressedKeys[83]&&playerTank.vy<=10){
    playerTank.vy+=1;
  }else if (pressedKeys[87]&&playerTank.vy>=-10){
    playerTank.vy-=1;
  }else{
    playerTank.vy-=Math.sign(playerTank.vy);
  }
  requestAnimationFrame(update);
}

function newTank(size, color, x, y){
  var tank = {"size":size,"color":color,"x":x,"y":y,"vx":0,"vy":0};
  tanks.push(tank);
  return tank;
}

function circle(x, y, size, color, context){
  context.fillStyle = color;
  context.beginPath();
        context.ellipse(x, y, size, size, 0, 0, 2 * Math.PI);
        context.fill();
}

function multiLinedText(lines, x, y, context, color, size, font){
  context.fillStyle=color;
  context.font = ""+size+"px "+font;
  for (var i=0; i<lines.length; i++){
    var line = lines[i];
    context.fillText(line, x, y+(i*size));
  }
}

let playerTank = newTank(50, "rgb(115, 153, 255)",50, 50);
update();