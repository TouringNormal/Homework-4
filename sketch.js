var horizon;
var obstacleSpeed;

var score;
var obstacles = [];

var dino;

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

function setup() {

  createCanvas(vw - 10, 800);

  textAlign(CENTER);

  horizon = height - 40;
 
	score = 0; 
	obstacleSpeed = 6;

	var size = 20;
	dino = new TRex(size * 2, height / 2, size);

  textSize(20);
}

function draw() {
  background(40);

	drawHUD();

	handleLevel(frameCount);

	dino.update(horizon);

  handleObstacles();
}

/**
	* draws horizon & score
	*/
function drawHUD() {

  /* draw horizon */
  stroke(255);
	strokeWeight(2);
  line(0, horizon, width, horizon);
  line(0, horizon - 720, width, horizon - 720);
  strokeWeight(15);
  line(0, horizon, width, horizon);
  stroke(100);
  strokeWeight(32);
  line(0, 784, width, 785);

	/* draw score */
	noStroke();
  text("Score: " + score, width / 2, 30);

	/* draw T-Rex */
	dino.draw();
}

/**
	*	updates, draws, and cleans out the obstacles
	*/
function handleObstacles() {

  for (var i = obstacles.length - 1; i >= 0; i--) {

		obstacles[i].update(obstacleSpeed);
		obstacles[i].draw();

		if (obstacles[i].hits(dino)) // if there's a collision
			endGame();

    if (!obstacles[i].onScreen) // if it's no longer showing
      obstacles.splice(i, 1); // delete from array
  }
}


/**
	* speeds game up, pushes new obstacles, & handles score
	*/
function handleLevel(n) {

  if (n % 15 === 0) { // every 0.5 seconds

    if (n > 0.5)
      newObstacle(n); // push new obstacle

	  if (n % 120 === 0) // every 2 seconds
	    obstacleSpeed *= 1.05; // speed up
  }

	score++;
}

/**
	* pushes random obstacle
	*/
function newObstacle(n) {

	var col = color(random(255), random(255), random(255));
  var size = random(30) + 20;
  //objektid

  var obs = new Obstacle(width + size, size, random(110, 745), col);
  var obs2 = new Obstacle(width + size, size, random(720, 745), col);
  var obs3 = new Obstacle(width + size, size, random(110, 130), col);
  var randomObject = Math.round(random(1, 7));

  //objektide loomine
  obstacles.push(obs);

  
  if(randomObject == 5){
    obstacles.push(obs);
  }

  if(randomObject == 6){
    obstacles.push(obs3);
  }

  if(randomObject == 7){
    obstacles.push(obs2);
  }
  

  
}

function keyPressed() {

  if ((keyCode === UP_ARROW || keyCode === 32)){ // jump if possible
    dino.jump();
  }
} 

function endGame() {
	noLoop();
  noStroke();
  textSize(40);
  text("GAME OVER", width / 2, height / 2);
  textSize(20);
  text("Press Play Again button to restart", width / 2, height / 2 + 20);
}

function restartGame(){
  location.reload();
}




