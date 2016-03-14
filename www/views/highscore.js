window.JST = window.JST || {};

window.JST['highscore'] = _.template(
    `<div id="panel">
      <div class="container">
        <img src="assets/img/highscore_panel.png" class="highscore-panel" class="img-responsive">

        <div class="highscore-content">
          <img src="assets/img/stars3.png" class="img-responsive stars">
          <p id="bestScore"><p>
          <p id="currentScore"><p>

          <div class="row">
            <div class="col-xs-6"><img src="assets/img/menu_btn.png" class="img-responsive" id="menu-btn"></div>
            <div class="col-xs-6"><img src="assets/img/forward_btn.png" class="img-responsive" id="start-btn"></div>
          </div>
        </div>
      </div>
    </div>`
);
