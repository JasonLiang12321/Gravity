function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60)
}
var fixed = false;
var mouseClickedDetection = 0;
var gClickDetection = false;
var ForMouseClickedP0;
var ForMouseClickedP1;
var isDeleteMode = false;
var slowness = false;
var drawTransparentCircleGravityThingy = false;
var sizeOfTransparentCircleGravityThingy = 20;
var stuffTobeDrawn = [];
var isMouseControl = false;
var isPaused = false;
var FPS = 1/60;
var Ball = {
  a : [10,10],
  v : [0,0],
  p : [300,400],
}

function mouseClicked(){
  if (mouseClickedDetection == 0){
    ForMouseClickedP0 = mouseX;
    ForMouseClickedP1 = mouseY;
    mouseClickedDetection = 1;

    
  }else{
    let distanceMoveX = mouseX - ForMouseClickedP0;
    let distanceMoveY = mouseY - ForMouseClickedP1;
   
    Ball.v[0] = distanceMoveX*1/2;
    Ball.v[1] = distanceMoveY*1/2;
    mouseClickedDetection = 0;
  }
  
}


function draw() {
  
  background(0);
  if (mouseClickedDetection == 1){
    push();
    

    strokeWeight(5);
    stroke(123,234,132);
    line(ForMouseClickedP0,ForMouseClickedP1,mouseX,mouseY);
    
    pop();
    
  }
  if (isMouseControl){
    noCursor();
    Ball.p[0] = mouseX;
    Ball.p[1] = mouseY;
  }
  
  if (!isPaused && !isMouseControl){
  Ball.v[0] = Ball.v[0] + Ball.a[0]*FPS;
  Ball.v[1] = Ball.v[1] + Ball.a[1]*FPS;
  Ball.p[0] = Ball.p[0] + Ball.v[0]*FPS;
  Ball.p[1] = Ball.p[1] + Ball.v[1]*FPS;
  }
  
  for (let i = 0; i < stuffTobeDrawn.length; i++){
    
    let ObjX = stuffTobeDrawn[i][0];
    let ObjY = stuffTobeDrawn[i][1];
    let ObjSize = stuffTobeDrawn[i][2];
    let whetherSlow = stuffTobeDrawn[i][3];
    if (ObjSize >= 0 && !whetherSlow ){
      fill(color(255,0,0));
    }else{
      if (ObjSize< 0 && !whetherSlow){
      fill(color(0,0,255));
      }else{
        fill(color(255,255,0));
      }
    }
    let BallX = Ball.p[0];
    let BallY = Ball.p[1];
    circle(ObjX,ObjY,ObjSize);
    let r = sqrt((ObjX - BallX)**2 + (ObjY - BallY)**2)
    let gravityConstant = 0.001;
    let Fg = gravityConstant * (ObjSize**3*10)/r**2
    let Rx = (ObjX-BallX);
    let Ry = (ObjY-BallY);
    let FutureMoveX = Rx*Fg;
    let FutureMoveY = Ry * Fg;
    if (isDeleteMode){
      if (sqrt((mouseX-ObjX)**2 + (mouseY-ObjY)**2) <= abs(ObjSize)/2){
        stuffTobeDrawn.splice(i,1);
      }
    }
    if (!isPaused && !isMouseControl && !whetherSlow){
      Ball.v[0] = Ball.v[0] + FutureMoveX*FPS;
      Ball.v[1] = Ball.v[1] + FutureMoveY*FPS;
      Ball.a[0] = Ball.a[0] + FutureMoveX*FPS;
      Ball.a[1] = Ball.a[1] + FutureMoveY*FPS;
    }
    if (whetherSlow){
      
      Ball.v[0] = Ball.v[0] * abs(map(abs(Fg),0,100,1,0));
      Ball.v[1] = Ball.v[1] * abs(map(abs(Fg),0,100,1,0));
      Ball.a[0] = Ball.a[0] * abs(map(abs(Fg),0,100,1,0));
      Ball.a[1] = Ball.a[1] * abs(map(abs(Fg),0,100,1,0));

      
    }
    
    if (r <= (abs(ObjSize)+30)/2){
      Ball.v[0] = -Ball.v[0];
      Ball.v[1] = -Ball.v[1];
      Ball.p[0] = Ball.p[0] + Ball.v[0]*FPS;
      Ball.p[1] = Ball.p[1] + Ball.v[1]*FPS;
      

    }
    
    
    
  }
  if (!drawTransparentCircleGravityThingy && !(isMouseControl)){
    cursor();
    
  }
  fill(255);
  if (Ball.p[0] >= width || Ball.p[0] <= 0){
    if (!isMouseControl){
    Ball.v[0] = -(0.75)*Ball.v[0];
    Ball.a[0] = -(0.5) * Ball.a[0];
    Ball.p[0] = Ball.p[0] + Ball.v[0]*FPS;
    }
  }
  if (Ball.p[1] >= height|| Ball.p[1] <= 0){
    if (!isMouseControl){
    Ball.v[1] = -(0.75)*Ball.v[1];
    Ball.a[1] = -(0.5)*Ball.a[1];
    Ball.p[1] = Ball.p[1] + Ball.v[1]*FPS;
    }
  }
  circle(Ball.p[0],Ball.p[1],30);
  if (drawTransparentCircleGravityThingy){
    
    noStroke();
    if (sizeOfTransparentCircleGravityThingy >= 0 && !slowness){
    fill(color(255,0,0,50));
    
    }else{
      if (sizeOfTransparentCircleGravityThingy < 0 && !slowness){
      fill(color(0,0,255,50));
      }else{
        fill(color(255,255,0,50));
      }
    }
    circle(mouseX,mouseY,sizeOfTransparentCircleGravityThingy);
    noCursor();
    fill(255);
    }

    
  }

  

  

  


document.addEventListener('keypress', (e)=>{
  switch (e.key){
    case 'r':
      Ball.a[0] = 0;
      Ball.a[1] = 0;
      Ball.v[0] = 0;
      Ball.v[1] = 0;
      Ball.p[0] = 300;
      Ball.p[1] = 400;
      mouseClickedDetection = 0;
      stuffTobeDrawn = [];
      drawTransparentCircleGravityThingy = false;
      gClickDetection = false;
      break;
    case 'g':
      if (!gClickDetection){
        drawTransparentCircleGravityThingy = true;
      }
      if (gClickDetection){
        drawTransparentCircleGravityThingy=false;
        cursor();
        stuffTobeDrawn.push([mouseX,mouseY,sizeOfTransparentCircleGravityThingy,slowness]);
        if(!fixed){
        sizeOfTransparentCircleGravityThingy = 20;
        }


      }
      gClickDetection = !gClickDetection;
      break;

      case 't':
        if(drawTransparentCircleGravityThingy){
          sizeOfTransparentCircleGravityThingy+=5;
        }
        break;
      case 'y':
        
          if(drawTransparentCircleGravityThingy){
          sizeOfTransparentCircleGravityThingy-=5;
          }
          break;
      case 's':
        if (drawTransparentCircleGravityThingy){
          slowness = !slowness;
        }
        break;
        
        
      
      case 'p':
        isPaused = !isPaused;
        break;
      case 'm':
        
        isMouseControl = !isMouseControl;
        
        break;
      case 'd':
        isDeleteMode = !isDeleteMode;
        break;
      case 'f':
        fixed = !fixed;
        break;
      case 'l':
        if (drawTransparentCircleGravityThingy){
          sizeOfTransparentCircleGravityThingy = -sizeOfTransparentCircleGravityThingy;
        }
        break;

    }

   

})