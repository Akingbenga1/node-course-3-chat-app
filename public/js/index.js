var socket = io();

		socket.on('connect', function(){
			console.log('connected to server');
		});


	// socket.emit('createEmail', {
	// 	to : 'funmi@example.com',
	// 	text : 'Hey. This is funmi. '
	// });

	// socket.emit('createMessage', {
	// 	from : 'Andrew',
	// 	text : 'Yup, that works for me'
	// });


		socket.on('disconnect', function(){
			console.log('Disconnected from server');
		});

		// socket.on('newEmail', function(email){
		// 	console.log('new Email', email);

		// }); 

		socket.on('newMessage', function(message){
			 console.log('new Message ', message);


		}); 