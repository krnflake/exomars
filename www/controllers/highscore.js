var highscore = Backbone.View.extend({
  el: "#highscore",
  template: window.JST['highscore'],
  events: {
    "click #menu-btn": "showMenu",
    "click #start-btn": "startGame"
  },
  showMenu: function() {
    navigator.vibrate(100);
    fsm.transitionTo(menuState);
  },
  startGame: function() {
    navigator.vibrate(100);
    fsm.transitionTo(gameState);
  },
  // Render the view
  render: function() {
    this.$el.html(this.template());

    // Adjust stars
    if (score > 10000) {
      this.$(".stars").attr("src", "assets/img/stars3.png");
    } else if (score > 5000) {
      this.$(".stars").attr("src", "assets/img/stars2.png");
    } else {
      this.$(".stars").attr("src", "assets/img/stars1.png");
    }

    $("#bestScore").text("Best Score: " + bestScore);
    $("#currentScore").text("Current Score: " + score);
  },
  // Hide the view
  hide: function() {
    this.$el.empty();
  }
});
