Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', function() {
  this.render('landing');
});

var playMusic = false;
var lookPainting = false;
var room1Done = false;
var room1Correct = false;
var room2Done = false;
var room2Correct = false;

var room1PrevPing = 0;
var room2PrevPing = 0;

function getGameState() {
	var result = 0;
	if (playMusic) {
		result = result | 1; //0x1
	}
	if (lookPainting) {
		result = result | 2; //0x10
	}
	if (room1Done && room2Done) {
		result = result | 4; //0x100
		if (room1Correct && room2Correct) {
			result = result | 8; //0x1000
		}
	}
	

	return result.toString();
}


Router.route("/room1", {where: "server"})
  .get( function() {
    this.response.statusCode = 200;
    this.response.end("room1 " + new Date().toString());
  })
  .post (function() {

		var intLookPainting = parseInt(this.request.body["lookPainting"]);
		if (intLookPainting == 1) {
			lookPainting = true;
		} else {
			lookPainting = false;
		}
		var intDone = parseInt(this.request.body["submitted"]);
		if (intDone == 1) {
			room1Done = true;
		} else {
			room1Done = false;
		}

		var intCorrect = parseInt(this.request.body["correct"]);
		if (intCorrect == 1) {
			room1Correct = true;
		} else {
			room1Correct = false;
		}

    this.response.statusCode = 200;
		var result = getGameState();
		room1PrevPing = Date.now();
		if (Date.now() - room2PrevPing > 1000) {
			console.log("room2 not connected");
			result = "0";
		}
		this.response.end(result);

  });

Router.route("/room2", {where: "server"})
  .get( function() {
    this.response.statusCode = 200;
    this.response.end("room2 " + new Date().toString());
  })
  .post (function() {
		var intPlayMusic = parseInt(this.request.body["playMusic"]);
		if (intPlayMusic == 1) {
			playMusic = true;
		} else {
			playMusic = false;
		}
		var intDone = parseInt(this.request.body["submitted"]);
		if (intDone == 1) {
			room2Done = true;
		} else {
			room2Done = false;
		}

		var intCorrect = parseInt(this.request.body["correct"]);
		if (intCorrect == 1) {
			room2Correct = true;
		} else {
			room2Correct = false;
		}

		console.log("playing music: " + playMusic + " , looking at painting: " + lookPainting);
		console.log("room1 done: " + room1Done + " , room2 done: " + room2Done);
		console.log("room1 correct: " + room1Correct + " , room2 correct: " + room2Correct);

    this.response.statusCode = 200;
		var result = getGameState();
		room2PrevPing = Date.now();
		if (Date.now() - room1PrevPing > 1000) {
			console.log("room1 not connected");
			result = "0";
		}
		this.response.end(result);
  });

