var sketch1 = function (s) {
    var canvasWidth = 0;
    var canvasHeight = 0;

    s.preload = function() {
      map = s.loadImage("images/book.jpg");
    }

    s.setup = function () {
      canvasWidth = $('#sketch1').width();
      canvasHeight = $('#sidebarContainer').height();
      //s.createCanvas($('#sketch1').width(), s.windowHeight * 0.75);
      s.createCanvas(canvasWidth, canvasHeight);
      s.rectMode(s.CENTER);
      s.imageMode(s.CENTER);
      s.noStroke();
    };


    s.draw = function () {
      s.background(255);
      s.image(map, canvasWidth / 2, canvasHeight / 2);
    }

    s.mouseClicked = function() {
      console.log('clicked!');
    }
};

Template.landing.onRendered(function() {
$('.ui.menu a.item').on('click', function() {   
  $(this)
    .addClass('active')
    .siblings()
    .removeClass('active'); 
	Session.set('menuSelect', this.id);
});
    new p5(sketch1, "sketch1");
})
