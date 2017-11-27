const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const generateMessage = require('./utils/message').generateMessage;
const generateLocationMessage = require('./utils/message').generateLocationMessage;
const isRealString = require('./utils/validation').isRealString;
const Users = require('./utils/users').Users;

const publicPath = path.join(__dirname  ,  '/../public');
const port = process.env.PORT || 3000;
//console.log(__dirname + '/../public');


var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));


io.on('connection', function(socket){
	console.log('New User Connected');

	// socket.emit('newEmail', {
	// 	from : 'gbenga@example.com',
	// 	text : 'Hey What is going on',	
	// 	createdAt : 123,	
	// });

	// socket.emit('newMessage', {
	// 	from : 'John',
	// 	text : 'See you then ',	
	// 	createdAt : 123123,	
	// });


	// socket.on('createEmail', function(newEmail) {
	// 	console.log('createEmail', newEmail );
	// });

	 // socket.emit('newMes sage',  generateMessage('Admin', 'welcome to the chat app' )  );

	 socket.on('createLocationMessage', function(coords){

	 	var user = users.getUser(socket.io);

		if(user )
		{
			//io.to(user.room).emit('newMessage', generateMessage(user.name,  message.text  )  );
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude , coords.longitude));
		}
		
	 		
	 });

	 // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined' ) ) ;

	 socket.on('join', function(params, callback) {
	 
	 		if(!isRealString( params.name)  ||  !isRealString(params.room) )
	 		{
	 			return callback('Name and room are required');
	 		}


	 		socket.join(params.room);
	 		users.removeUser(socket.id);
	 		users.addUser(socket.id, params.name, params.room)
	 		io.to(params.room).emit('updateList', users.getUserList(params.room));
	 		// socket.leave(params.room)

	 		// io.emit -> io.to('Office Fan').emit
	 		// socket.broadcast.emit // socket.brocast.to('The Office Fn ').emit()
	 		// socket.emit

	 		socket.emit('newMessage',  generateMessage('Admin', 'welcome to the chat app' )  );
 
	 		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', params.name + ' has joined.' ) ) ;


	 		callback();
	

	 });

	socket.on('createMessage', function(message, callback) {
		//console.log('createEmail', newEmail );
		//console.log('createMessage', message );
		var user = users.getUser(socket.io);

		if(user && isRealString(message.text))
		{
			io.to(user.room).emit('newMessage', generateMessage(user.name,  message.text  )  );
		}
		


		
		// {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// })


		// socket.broadcast.emit('newMessage', {

		// 	from : message.from,
		// 	text : message.text,
		// 	createdAt : new Date().getTime()
		// });


		
		 	//{

		// 	from : 'Admin',
		// 	text : 'welcome to the chat app',
		// 	createdAt : new Date().getTime()
		// }
		//);

		
		// {

		// 	from : 'Admin',
		// 	text : 'New user joined',
		// 	createdAt : new Date().getTime()

		// });
		callback();
		});

	

	socket.on('disconnect', function(){
			console.log('User was Disconnected ');

			var user = users.removeUser(socket.id);

			if(user)
			{
				io.to(user.room).emit('updateUserList', users.getUserList(user.room));
				io.to(user.room).emit('newMesage', generateMessage('Admin', user.name + ' has left.' ))
			}
		});
} );





server.listen(port, function(){
	console.log('Server is up on port ' + port );

});

// app.listen(port, function(){
// 	console.log('Server is up on port' + port );

// });