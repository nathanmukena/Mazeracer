//got inspiration from following http://www.html5canvastutorials.com/advanced/
var canvas = document.getElementById('mycanvas'),
    ctx = canvas.getContext('2d'),
    SCREEN_WIDTH =  window.innerWidth,
    SCREEN_HEIGHT =  window.innerHeight,
    particleNum = 400,
    ANIMATION;

var particles = [];

function Particle(pos) {
  this.id = pos;
  this.hue =  Math.random()*5;
  this.active = false;
  
  this.vel = {
        x: 0,
        y: 0
    };
  this.resistence = 1;
}



Particle.prototype.update = function() {
    this.vel.x *= this.resistance;
    this.vel.y *= this.resistance;

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
};



Particle.prototype.build = function() {
  this.x = (SCREEN_WIDTH*randomNum(-1,2))/ 2;
  this.y =  SCREEN_HEIGHT / 2; 
  this.vx = Math.random() * 10 - 4;
  this.vy = Math.random() * 10 - 4;
  this.zzz = randomNum(1,10)*2.5;
  this.gravity = 1/50;
  this.active = true;

  ctx.beginPath();
  ctx.arc(this.x, this.y, this.zzz, 1, 2 * Math.PI, true);
  ctx.fillStyle = "hsla(" + this.hue + ",70%,50%,2)";
  ctx.fill();
};

Particle.prototype.draw = function() {
  this.active = true;
  this.x += this.vx;
  this.y += this.vy;
  this.vy += this.gravity;
  this.hue = this.hue - 1;
  this.zzz = Math.abs(this.zzz - .05);
  this.vel.x *= this.resistance;
    this.vel.y *= this.resistance;



  ctx.beginPath();
  ctx.arc(this.x, this.y, this.zzz, 0, 2 * Math.PI, false);
  ctx.fillStyle = "hsla(" + this.hue + ",70%,50%,2)";
  ctx.fill();

  if(this.r <= .6) {
    this.active = false;
  }
};



function drawScene() {
  ctx.fillStyle = "black";
  ctx.fillRect(0,0, SCREEN_WIDTH,SCREEN_HEIGHT);

  for(var i = 0; i < particles.length; i++) {
    if(particles[i].active === true) {
      particles[i].draw();
    } else {
      particles[i].build();
    }
  }
   //Congratulations title  
        ctx.font = "100px Arial";
        ctx .fillText("Congratulations!", SCREEN_WIDTH/4.75,200); //325, 200 
        ctx.fillText("You Win!", SCREEN_WIDTH/3,300); //475, 300
        ANIMATION = requestAnimationFrame(drawScene);
  }


function randomNum( min, max ) {
    return Math.random() * ( max - min ) + min;
}

//init
(function() {

  if(particles.length) {
    particles = [];
    cancelAnimationFrame(ANIMATION);
    ANIMATION;
    
  }
    SCREEN_WIDTH = canvas.width = window.innerWidth;
    SCREEN_HEIGHT = canvas.height = window.innerHeight;

  for(var i = 0; i < particleNum; i++) {
      particles.push(new Particle(i));
  }
  drawScene();
  
})();



