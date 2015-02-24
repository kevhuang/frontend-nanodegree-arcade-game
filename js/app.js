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

  // Handles collision with player
  // The x comparison with player.x is offset by 25 so that the player sprite is visually closer to the enemy sprite
  // The y comparison with player.y is offset by 6 due to the player sprite being offset by 6px in relation to 
  // the enemy sprites so that the player sprite doesn't flow over the canvas boundary
  if (player.x + 25 >= this.x - X_MOVE_UNITS && player.x + 25 <= this.x + X_MOVE_UNITS && this.y === player.y - 6) {
    player.reset();
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
  this.x = X_MOVE_UNITS * 2;
  this.y = Y_MOVE_UNITS * 3 + 71;

  this.update = function(x, y) {
    if (x) {
      this.x = x;
    }
    if (y) {
      this.y = y;
    }
  };
  this.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  this.handleInput = function(direction) {
    var x = this.x;
    var y = this.y;

    if (direction === 'left') {
      x = (x - X_MOVE_UNITS < 0) ? x : x - X_MOVE_UNITS;
    } else if (direction === 'right') {
      x = (x + X_MOVE_UNITS >= X_MOVE_UNITS * 5) ? x : x + X_MOVE_UNITS;
    } else if (direction === 'up') {
      y = (y - Y_MOVE_UNITS < -Y_MOVE_UNITS) ? y : y - Y_MOVE_UNITS;
    } else if (direction === 'down') {
      y = (y + Y_MOVE_UNITS >= Y_MOVE_UNITS * 5) ? y : y + Y_MOVE_UNITS;
    }

    if (x !== this.x || y !== this.y) {
      // Only update player coordinates if they are within the bounds of board
      this.update(x, y);
    }

    // Resets the player when player reaches the water
    if (this.y < 0) {
      var context = this;
      // Enforce a delay in resetting the player so that the player can be seen reaching the water
      setTimeout(function() {
        context.reset();
      }, 500);
    }
  };
  this.reset = function() {
    this.x = X_MOVE_UNITS * 2;
    this.y = Y_MOVE_UNITS * 3 + 71;
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