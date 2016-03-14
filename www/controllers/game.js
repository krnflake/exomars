var game;
var space;
var player;
var playerShadow;
var alive;
var meteors;
var cursors;
var score = 0;
var bestScore = window.localStorage.getItem("highscore") || 0;
var scoreBackground;
var scoreText;

// Initialize a new fullsize game
game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'game', {
  preload: onPreload,
  create: onCreate,
  update: onUpdate
});

/**
 * Preload is called first. We use this to load all game assets.
 */
function onPreload() {
  // Assets
  game.load.image('space', 'assets/img/background.png');
  game.load.image('score', 'assets/img/score_background.png');
  game.load.image('player', 'assets/img/player.png');
  game.load.image('meteor1', 'assets/img/meteor1.png');
  game.load.image('meteor2', 'assets/img/meteor2.png');
  game.load.image('meteor3', 'assets/img/meteor3.png');
  game.load.image('meteor4', 'assets/img/meteor4.png');
}

/**
 * Create is called once preload has completed.
 */
function onCreate() {
  // Background
  space = game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'space');

  // GUI
  scoreBackground = game.add.sprite(0, 0, 'score');
  scoreBackground.scale.setTo(0.6, 0.6);
  var style = {
    font: '20px Carter One',
    fill: '#fff'
  };
  scoreText = game.add.text(65, 10, null, style);

  // Player & player shadow
  playerShadow = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
  playerShadow.tint = 0x000000;
  playerShadow.alpha = 0.6;
  playerShadow.scale.setTo(0.6, 0.6);
  player = game.add.sprite(window.innerWidth * 0.5, window.innerHeight * 0.8, 'player');
  player.scale.setTo(0.6, 0.6);
  player.enableBody = true;
  game.physics.enable(player, Phaser.Physics.ARCADE);
  player.body.collideWorldBounds = true;

  // Move shadow
  playerShadow.x = player.x + 5;
  playerShadow.y = player.y + 5;

  // Meteors
  meteors = game.add.group();
  meteors.enableBody = true;
  meteors.physicsBodyType = Phaser.Physics.ARCADE;

  // Hide sprites
  scoreBackground.visible = false;
  scoreText.visible = false;
  player.visible = false;
  playerShadow.visible = false;

  cursors = game.input.keyboard.createCursorKeys();
}

/**
 * Spawns meteors on top of the screen.
 */
function spawnMeteors() {
  meteors.removeAll();

  for (var x = 0; x < 3; x++) {
    var meteor = meteors.create(game.rnd.integerInRange(0, window.innerWidth), 0, 'meteor' + game.rnd.integerInRange(1, 4));
    meteor.body.velocity.y = game.rnd.integerInRange(100, 300);
  }
}

/**
 * Callback which get's called by Phonegap's acceleration api once the
 * sensor delivers data.
 */
function accSuccess(acceleration) {
  if (alive && Math.abs(acceleration.x) > .25) {
    player.body.velocity.x = -acceleration.x * 200; // tilting left is positiv!
  } else {
    player.body.velocity.x = 0;
  }
}

/**
 * Called during the core game loop.
 */
function onUpdate() {
  space.tilePosition.y += 2;

  if (alive) {
    // GUI
    scoreText.text = (score += game.rnd.integerInRange(1, 10));

    // Scroll background
    space.tilePosition.y += 2;

    player.body.velocity.setTo(0, 0);
    // navigator.accelerometer.getCurrentAcceleration(accSuccess);

    player.body.velocity.setTo(0, 0);
    if (cursors.left.isDown) {
      player.body.velocity.x = -400;
    } else if (cursors.right.isDown) {
      player.body.velocity.x = 400;
    }
    if (cursors.down.isDown) {
      player.body.velocity.y = 400;
    } else if (cursors.up.isDown) {
      player.body.velocity.y = -400;
    }

    // Move shadow
    playerShadow.x = player.x + 5;
    playerShadow.y = player.y + 5;

    // Loop meteors
    meteors.forEach(function(meteor) {
      if (meteor.position.y > window.innerHeight) {
        meteor.loadTexture('meteor' + game.rnd.integerInRange(1, 4));
        meteor.position.x = game.rnd.integerInRange(0, window.innerWidth);
        meteor.position.y = 0;
      }
    });

    // Run collision
    game.physics.arcade.overlap(meteors, player, collision, null, this);
  }
}

/**
 * Called by the physics engine when the player collides which
 * a meteor.
 */
function collision(player, meteor) {
  navigator.vibrate(200);
  alive = false;

  // Stop movement
  player.body.velocity.setTo(0, 0);

  meteors.forEach(function(meteor) {
    meteor.body.velocity.setTo(0, 0);
  });

  // Update highscore
  if (score > bestScore) {
    bestScore = score;
    window.localStorage.setItem("highscore", score);
  }

  fsm.postEvent('player.died');
}

/**
 * Initialize various game objects.
 */
function start() {
  alive = true;
  score = 0;

  scoreBackground.visible = true;
  scoreText.visible = true;
  player.visible = true;
  playerShadow.visible = true;
  meteors.forEach(function(meteor) {
    meteor.visible = true;
  });

  // Move player to the bottom center for the screen
  player.x = window.innerWidth * 0.5;
  player.y = window.innerHeight * 0.8;

  spawnMeteors();
}

/**
 * Pauses the current game.
 */
function pause() {
  alive = false;

  scoreBackground.visible = false;
  scoreText.visible = false;
  player.visible = false;
  playerShadow.visible = false;
  meteors.forEach(function(meteor) {
    meteor.visible = false;
  });
}
