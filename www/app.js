// Finite state machine
var fsm = new Fsm();

// +------------+           +------------+
// |            | +-------> |            |
// |    Menu    |           |    Score   |
// |            | <-------+ |            |
// +------------+           +------------+
//  +                              +  ^
//  |      +--------------------+  |  |
//  |      |                    | <+  |
//  |      |       Game         |     |
//  +----> |                    | +---+
//         +--------------------+

// Menu state
var menuState = new Fsm.State({
  fsm: fsm,
  name: 'menu',
  view: new menu(),
  onEntry: function() {
    this.view().render();
  },
  onExit: function() {
    this.view().hide();
  }
});

// Score state
var highscoreState = new Fsm.State({
  fsm: fsm,
  name: 'highscore',
  view: new highscore(),
  onEntry: function() {
    this.view().render();
  },
  onExit: function() {
    this.view().hide();
  }
});

// Game state
var gameState = new Fsm.State({
  fsm: fsm,
  name: 'game',
  onEntry: function() {
    start();
  },
  onExit: function() {
    pause();
  },
  onEvent: function(event) {
    if (event === 'player.died') {
      this.transitionTo(highscoreState);
    }
  }
});

// Starting the fsm
fsm.start(menuState);
