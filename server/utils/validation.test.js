const expect = require('expect');


const isRealString =  require('./validation').isRealString;


describe('generateMessage', function(){


	it('should reject non-string ', function()
	{

	var res = isRealString(98);
	expect(res).toBe(false);
	});



	it('should reject string with only spaces ', function()
	{
		var res = isRealString(' ');
		expect(res).toBe(false);
		
	});


	it('should allow string with non-space characters', function()
	{
		var res = isRealString(' Gbenga  ');
		expect(res).toBe(true);
		
	});

});
