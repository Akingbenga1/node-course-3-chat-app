var expect = require('expect');

var generateMessage = require('./message').generateMessage;


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