var expect = require('expect');

var generateMessage = require('./message').generateMessage;
var generateLocationMessage = require('./message').generateLocationMessage;


describe('generateMessage', function(){


it('should generate correct message object', function()
{
	var from  = 'Jen';
	var text  = 'Some Message';

	var message = generateMessage(from, text);

	expect(message.createdAt).toBeA('number');
	expect(message).toInclude({from, text});
});
});



describe('generateLocationMessage', function(){


it('should generate correct location object', function()
{
	var from  = 'Jen';
	var text  = 'Some Message';
	var latitude = 15;
	var longitude = 19;
	var url = 'https://www.google.com/maps?q=15,19';

	var message = generateLocationMessage(from, latitude, longitude );

	expect(message.createdAt).toBeA('number');
	expect(message).toInclude({from, url});
});
});