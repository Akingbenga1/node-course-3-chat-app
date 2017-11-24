const expect = require('expect');

const Users = require('./users').Users;


beforeEach( function()
{
	users = new Users();
	users.users = 
	[{
		id: '1',
		name: 'Gbenga',
		room : 'Node Course'

	},
	{
		id: '2',
		name: 'Funmi',
		room : 'React Course'

	},
	{
		id: '3',
		name: 'Dammy',
		room : 'Node Course'

	}];

}); 

describe('Users', function()
{

	it('should add new user', function()
	{
		var users = new Users();
		var user = {
						id : '123',
						name: 'Gbenga',
						room : 'The Office Fans'
					};
		var resUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);

	});


	it('it should return name for node course', function()
	{
		var userList = users.getUserList('Node Course');
		expect(userList).toEqual(['Gbenga', 'Dammy']);

	});
	it('it should return name for react course', function()
	{
		var userList = users.getUserList('React Course');
		expect(userList).toEqual(['Funmi']);

	});

	it('it should remove a user', function()
	{
		var userID = '1';
		var user = users.removeUser(userID);

		expect(user.id).toBe(userID);
		expect(users.users.length).toBe(2);
		

	});

	it('it should not remove a user', function()
	{
		var userID = '99';
		var user = users.removeUser(userID);

		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
		

	});

	it('it should find user ', function()
	{
		var userID =  '2';
		var user =  users.getUser(userID);
		expect(user.id).toEqual(userID);

	});


	it('it should not find user ', function()
	{
		var userID =  '99';
		var user =  users.getUser(userID);
		expect(user).toNotExist();


	});
});