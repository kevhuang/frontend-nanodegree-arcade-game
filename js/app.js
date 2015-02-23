// How many pixels each character moves at a time in X and Y directions
var X_MOVE_UNITS = 101;
var Y_MOVE_UNITS = 83;

// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';

  // Generate random coordinates when the Enemy is instantiated
  this.x = Math.floor(Math.random() * 5) * X_MOVE_UNITS;
  this.y = Math.floor(Math.random() * 3) * Y_MOVE_UNITS + 65;

  // Randomize the enemy's speed
  this.speed = Math.random() * 200 + 200;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;
  if (this.x >= X_MOVE_UNITS * 5) {
    this.x = -X_MOVE_UNITS;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';

  // Inital starting position for the player
  this.x = 202;
  this.y = 320;

  this.update = function(direction) {
    if (direction === 'left') {
      this.x = (this.x - X_MOVE_UNITS < 0) ? this.x : this.x - X_MOVE_UNITS;
    } else if (direction === 'right') {
      this.x = (this.x + X_MOVE_UNITS >= X_MOVE_UNITS * 5) ? this.x : this.x + X_MOVE_UNITS;
    } else if (direction === 'up') {
      this.y = (this.y - Y_MOVE_UNITS < -Y_MOVE_UNITS) ? this.y : this.y - Y_MOVE_UNITS;
    } else if (direction === 'down') {
      this.y = (this.y + Y_MOVE_UNITS >= Y_MOVE_UNITS * 5) ? this.y : this.y + Y_MOVE_UNITS;
    }
  };
  this.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  this.handleInput = function(direction) {
    this.update(direction);
  };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies.push(new Enemy(), new Enemy(), new Enemy(), new Enemy());
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});