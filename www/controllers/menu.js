var menu = Backbone.View.extend({
  el: "#menu",
  template: window.JST['menu'],
  events: {
    "click #start-btn": "startGame",
    "click #score-btn": "showScore",
    "click #stop-btn": "exitGame"
  },
  startGame: function() {
    navigator.vibrate(100);
    fsm.transitionTo(gameState);
  },
  showScore: function() {
    navigator.vibrate(100);
    fsm.transitionTo(highscoreState);
  },
  exitGame: function() {
    navigator.vibrate(100);
    if (navigator.app) {
      navigator.app.exitApp();
    } else if (navigator.device) {
      navigator.device.exitApp();
    }
  },
  // Render the view
  render: function() {
    this.$el.html(this.template());
  },
  // Hide the view
  hide: function() {
    this.$el.empty();
  }
});
