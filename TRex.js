function TRex(x, y, radius) {

	this.x = x;
	this.y = y;

	this.yVelocity = 0;
	this.speed = 1;
	this.onGround = true;

	this.radius = radius; // size of circle
}

/**
	*	handle y values
	*/
TRex.prototype.update = function(platform) {

	var bottom = this.y + this.radius; // bottom pixel of circle
	var nextBottom = bottom + this.yVelocity; // calculate next frame's bottom
	var top = this.y - this.radius;
	var nextTop = top - this.yVelocity;

  if (bottom <= platform && nextBottom >= platform) { // next frame will be on platform

		this.yVelocity = 0; // reset velocity
		this.y = platform - this.radius; // don't go past platform
		this.onGround = true;
		console.log("on the ground");
  } else if (platform - bottom > 1) { // nowhere near platform

		this.yVelocity += this.speed; // increase velocity
		this.onGround = false;
  }
  if(this.y <= 60){
	  this.yVelocity = 0;
	  this.y = 61;
	  console.log("hit the roof");   
  }



  
	/* movement */
	this.y += this.yVelocity;
};

/**
	* make the dino jump
	*/
TRex.prototype.jump = function() {

	this.yVelocity = -(this.radius * 0.7); // jump
};

TRex.prototype.draw = function() {

  fill('#0000FF');
	stroke(169);
	strokeWeight(3);
  ellipse(this.x, this.y, this.radius * 2);
};