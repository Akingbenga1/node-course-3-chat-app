var generateMessage = function(from, text){

var r = {};
r.from = from;
r.text = text;
r.createdAt = new Date().getTime();
	return      r;
	 
};

module.exports = {generateMessage : generateMessage};