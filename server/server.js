const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');


const publicPath = path.join(__dirname  ,  '/../public');
const port = process.env.PORT || 3000;
//console.log(__dirname + '/../public');


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', function(socket){
	console.log('New User Connected');

	socket.emit('newEmail', {
		from : 'gbenga@example.com',
		text : 'Hey What is going on',	
		createdAt : 123,	
	});

	socket.emit('newMessage', {
		from : 'John',
		text : 'See you then ',	
		createdAt : 123123,	
	});


	// socket.on('createEmail', function(newEmail) {
	// 	console.log('createEmail', newEmail );
	// });

	socket.on('createMessage', function(message) {
		//console.log('createEmail', newEmail );
		console.log('createMessage', message );

	});

	socket.on('disconnect', function(){
			console.log('User was Disconnected ');
		});
} )





server.listen(port, function(){
	console.log('Server is up on port' + port );

});

// app.listen(port, function(){
// 	console.log('Server is up on port' + port );

// });