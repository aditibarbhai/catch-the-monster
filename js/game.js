// GLOBAL VARS
var min_X = 0;
var max_X = 483;
var min_Y = 0;
var max_Y = 440;

// create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;

$(document).ready(function(){
	document.body.appendChild(canvas);
});

/* IMAGES */
// background image 
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
	bgReady = true;
};
bgImage.src = "images/background.png";

// hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function() {
	heroReady = true;
}
heroImage.src = "images/hero.png";

// monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function() {
	monsterReady = true;
}
monsterImage.src = "images/monster.png";

/* GAME OBJECTS */
var hero = {
	speed : 256, // movement in pixels per second
	x : 0,
	y : 0
};

var monster = {	// monsters don't move
	x : 0,
	y : 0
};

var monstersCaught = 0;	// the # of monsters the player has caught

/* HANDLE PLAYER INPUT */
// keyboard controls
// store users input for later instead of acting on it immediately
// if a key code is in the object "keysDown", the user is currently pressing that key
var keysDown = {};

addEventListener("keydown", function(e){
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
	delete keysDown[e.keyCode];
}, false);

/* NEW GAME */

// random number generator from MDN:
/**
 * Returns a random number between min and max
 */
function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}


// Reset the game when the player catches the monster
// Or use this function to start a new game/level
var reset = function(){
	// place hero in middle of screen
	hero.x = canvas.width/2;
	hero.y = canvas.height/2;

	// place monster randomly on screen
	monster.x = getRandomArbitary(0, 440);// 32 + (Math.random() * (canvas.width - 64));
	console.log(monster.x);
	monster.y = getRandomArbitary(0, 450); //32 + (Math.random() * (canvas.height - 64));
	console.log(monster.y);
}

/* Update Objects */
// this function is called repeatedly at a set interval
var update = function(modifier){
	// arrow key up is pressed
	if (38 in keysDown) {
		hero.y -= hero.speed * modifier;
		// make sure hero doesn't go off screen
		if (hero.y < min_Y) hero.y = min_Y;
	}

	// arrow key down is pressed
	if (40 in keysDown) {
		hero.y += hero.speed * modifier;
		// make sure hero doesn't go off screen
		if (hero.y > max_Y) hero.y = max_Y;
	}

	// arrow key left is pressed
	if (37 in keysDown) {
		hero.x -= hero.speed * modifier;
		// make sure hero doesn't go off screen
		if (hero.x < min_X) hero.x = min_X;
	}

	if (39 in keysDown) { // arrow key right is pressed
		hero.x += hero.speed * modifier;
		// make sure hero doesn't go off screen
		if (hero.x > max_X) hero.x = max_X;
	}

	// Check if hero and monster are overlapping on screen
	if (hero.x <= (monster.x + 32) &&
		monster.x <= (hero.x + 32) &&
		hero.y <= (monster.y + 32) &&
		monster.y <= (hero.y + 32) ) {
		
		++monstersCaught;	// increment monsters caught
		reset();	// reset to show new monster
	}
}

/* RENDER OBJECTS */
// draw everything
var render = function() {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// SCORE
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Monsters caught: " + monstersCaught, 32, 32);
}

/* MAIN GAME LOOP */
var main = function() {
	var now = Date.now();
	var delta = now - then;

	update(delta/1000);
	render();

	then = now;
}

/* START THE GAME */
reset();
var then = Date.now();
setInterval(main, 1); // execute as fast as possible
