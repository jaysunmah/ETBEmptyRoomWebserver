import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	Meteor.publish('picked_items', function() {
		return Meteor.Items;
	});
});

Meteor.methods({
    'sendCoords': function(x, y){
      console.log('wei', x, y);
      //HTTP.get('http://127.0.0.1:5000/wei');
      var options = {
        'x': x,
        'y': y,
      }
      HTTP.post('http://127.0.0.1:5000/wei', options)
    }
});

function ping() {
	HTTP.get("https://sheltered-refuge-14380.herokuapp.com/");
	console.log("Pinged!");
}

Meteor.setInterval(ping, 10000);

