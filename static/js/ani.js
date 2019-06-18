// Set Up Canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var frameInterval;
var fps = 24;

// Bomb Controls
var minInBomb = 50,
  maxInBomb = 250,
  bombMakeRate = 25; //MS

// Paricles
var minExplosionRadius = 0,
  maxExplosionRadius = 250;

let target = {
  x: 500,
  y: 500,
  ox: 500,
  oy: 500,
  r: 10,
  a: 0,
  a2: 0
};

let bombs = [];
let particles = [];

// Main Draw function
function draw() {
  drawScene();
  drawTarget();
  bombs.forEach(drawBombs);
  particles.forEach(drawParticles);
}

// Draw -> Target
function drawTarget() {
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#fff";

  var angle = 1.5 * Math.PI;
  target.a = target.a + 0.2;
  target.a2 = target.a2 + 0.1;

  ctx.arc(target.x, target.y, target.r, 0 + target.a, angle + target.a);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(target.x, target.y, target.r * 2, 0 + target.a2, angle + target.a2);
  ctx.stroke();

  ctx.beginPath();
  ctx.rect(target.x - target.r * 2.5, target.y, target.r * 5, 1);
  ctx.stroke();

  ctx.beginPath();
  ctx.rect(target.x, target.y - target.r * 2.5, 1, target.r * 5);
  ctx.stroke();
}

// Draw -> Bombs
function drawBombs(b) {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.shadowBlur = 80;
  ctx.shadowColor = b.c1;
  var linearGradient = ctx.createLinearGradient(
    0,
    0,
    canvas.width,
    canvas.height
  );
  linearGradient.addColorStop(0, b.c1);
  linearGradient.addColorStop(1, b.c2);

  ctx.strokeStyle = linearGradient;
  ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
  ctx.stroke();
  // ctx.fill();
}

// Draw -> Particles
function drawParticles(p) {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.shadowBlur = 0;
  ctx.shadowColor = p.c1;

  var color1 = hexToRgb(p.c1, p.opp);
  var color2 = hexToRgb(p.c2, p.opp);

  var linearGradient = ctx.createLinearGradient(
    0,
    0,
    canvas.width,
    canvas.height
  );
  linearGradient.addColorStop(0, "rgba(" + color1 + ")");
  linearGradient.addColorStop(1, "rgba(" + color2 + ")");

  ctx.strokeStyle = linearGradient;
  ctx.beginPath();
  ctx.moveTo(p.ox, p.oy);
  ctx.lineTo(p.x, p.y);

  ctx.stroke();

  ctx.fillStyle = linearGradient;
  ctx.beginPath();
  ctx.arc(p.x, p.y, 1, 0, 2 * Math.PI);
  ctx.fill();
}

// Draw skyline and text
var img = new Image();
function drawScene() {
  ctx.lineWidth = 3;
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.font = "150px Arial";
  ctx.textAlign = "center";
  ctx.strokeText("CLICK & DRAG", canvas.width / 2, canvas.height / 2);

  ctx.shadowBlur = 0;
  ctx.shadowColor = "rgba(0,0,0,0)";
  img.src =
    "https://cdn.pixabay.com/photo/2017/10/16/23/02/brooklyn-2858985_960_720.png";
  ctx.drawImage(img, canvas.width / 2 - 600, canvas.height - 600, 1200, 700);
}

// Get RGBA value from Hex
function hexToRgb(hex, alpha) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: alpha
  };
  var str = r.r + "," + r.g + "," + r.b + "," + r.a;
  return str;
}

// Make Target Follow Mouse
function targetMove(e) {
  var rect = canvas.getBoundingClientRect();

  target.ox = target.x;
  target.oy = target.y;

  target.x = e.clientX - rect.left;
  target.y = e.clientY - rect.top;
}

// Make Bombs
var bombMakeInt;
function makeBomb() {
  bombMakeInt = setInterval(function() {
    var speedX = target.x - target.ox;
    var speedY = target.y - target.oy;

    var newBomb = {
      r: 20,
      x: target.x,
      y: target.y,
      p: Math.floor(Math.random() * (maxInBomb - minInBomb + 1)) + minInBomb,
      c1: getRandomColor(),
      c2: getRandomColor(),
      sx: speedX,
      sy: speedY
    };
    bombs.push(newBomb);
  }, bombMakeRate);

  var speedX = target.x - target.ox;
  var speedY = target.y - target.oy;
  var newBomb = {
    r: 20,
    x: target.x,
    y: target.y,
    p: Math.floor(Math.random() * (maxInBomb - minInBomb + 1)) + minInBomb,
    c1: getRandomColor(),
    c2: getRandomColor(),
    sx: speedX,
    sy: speedY
  };
  bombs.push(newBomb);
}
// Stop Making Bombs
function stopMakeBomb() {
  clearInterval(bombMakeInt);
}

//Update Bombs
function updateBombs() {
  for (var i = 0; i < bombs.length; i++) {
    bombs[i].x = bombs[i].x + bombs[i].sx;
    bombs[i].y = bombs[i].y + bombs[i].sy;

    var t = bombs[i].r;
    t--;
    if (t < 1) {
      t = 1;
      explodeBomb(bombs[i]);
      bombs.splice(i, 1);
    } else {
      bombs[i].r = t;
    }
  }
}

// Explode Bomb
function explodeBomb(b) {
  for (var i = 0; i < b.p; i++) {
    var crY =
      Math.floor(
        Math.random() * (maxExplosionRadius - minExplosionRadius + 1)
      ) + minExplosionRadius;
    var posOrNegY = Math.random() < 0.5 ? -1 : 1;

    var crX =
      Math.floor(
        Math.random() * (maxExplosionRadius - minExplosionRadius + 1)
      ) + minExplosionRadius;
    var posOrNegX = Math.random() < 0.5 ? -1 : 1;

    var newParticle = {
      s: Math.floor(Math.random() * (10 - 2 + 1)) + 10,
      a: 20,
      x: b.x,
      y: b.y,
      ox: b.x,
      oy: b.y,
      tx: b.x + posOrNegX * crX,
      ty: b.y + posOrNegY * crY,
      c1: b.c1,
      c2: b.c2,
      opp: 1
    };

    particles.push(newParticle);
  }
}

function updateParticles() {
  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];

    var nx = p.tx - p.x,
      ny = p.ty - p.y,
      dist = Math.sqrt(nx * nx + ny * ny);

    var velX = nx / dist * p.s,
      velY = ny / dist * p.s;

    p.ox = p.x;
    p.oy = p.y;
    p.x += velX;
    p.y += velY;

    p.opp = p.opp - 0.05;

    if (
      p.x < p.tx + p.s &&
      p.x > p.tx - p.s &&
      p.y < p.ty + p.s &&
      p.y > p.ty - p.s
    ) {
      particles.splice(i, 1);
    }
  }
}

// Random Color
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Canvas Resize
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw();
}
resizeCanvas();

// Main Frame Loop
function frame() {
  frameInterval = setTimeout(function() {
    //Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //CountdownBombs
    updateBombs();

    //Update Particles
    updateParticles();

    //Draw Screen
    draw();

    //Next Frame
    requestAnimationFrame(frame);
  }, 1000 / fps);
}
// Start Frame Loop
frame();

// Event Listeners
document.getElementById("canvas").addEventListener("mousemove", targetMove);
window.addEventListener("resize", resizeCanvas, false);
document.getElementById("canvas").addEventListener("mousedown", makeBomb);
document.getElementById("canvas").addEventListener("mouseup", stopMakeBomb);
