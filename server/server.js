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