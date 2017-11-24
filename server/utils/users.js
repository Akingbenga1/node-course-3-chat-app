//use 'strict';
 "use strict";

 class Users
 {
 	constructor()
 	{
 		this.users = [];
 	}

 	addUser(id, name, room)
	{
		var user = {id, name, room};
		this.users.push(user);
		return user;
	}

	removeUser(id)
	{
		var user = this.getUser(id);
		if(user)
		{
			this.users = this.users.filter(function(user){
				return user.id != id;
			})

		}

		return user;
	}

	getUser(id)
	{
		return this.users.filter(function(user){
			return user.id === id;

		})[0];
		
	}

	getUserList(room)
	{
		var users = this.users.filter(function(user){
			return user.room === room;
		});

		var namesArray = users.map(function(user){
			return user.name;
		});

		return namesArray;
	}

 }

// class Person 
// {
// 	constructor(name, age)
// 	{
// 		console.log(name, age);
// 		this.name = name;
// 		this.age = age;
	  
// 	}

// 	getUserDescription()
// 	{
// 		return this.name + ' is ' + this.age + ' year(s) old';
// 	}


// }

// var me  = new Person('Gbenga', 29);
// console.log('this.name ' + me.name + ' this.age' + me.age);

// var description = me.getUserDescription();
// console.log(description);


module.exports = {
	Users: Users
}