var generateMessage = function(from, text){

var r = {};
r.from = from;
r.text = text;
r.createdAt = new Date().getTime();
	return      r;
	 
};


var generateLocationMessage = function(from, latitude, longitude){

var r = {};
r.from = from;
r.url = 'https://www.google.com/maps?q=' + latitude + ',' + longitude;
r.createdAt = new Date().getTime();
	return  r;
	 
};
module.exports = {

	generateMessage : generateMessage,
	generateLocationMessage : generateLocationMessage

};