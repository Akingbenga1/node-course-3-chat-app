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
			 // jQuery('#messages').empty();
			 console.log('new Message ', message);
			 var li = jQuery('<li></li>');
			 li.text(message.from + ':' + message.text);
			 jQuery('#messages').append(li);
		}); 


		// socket.emit('createMessage', 
		// {
		// 	from : "Gbenga",
		// 	text : 'Hi'
		// }, 
		// function(data)
		// {
		// 		console.log('Got it', data);
		// }); 



		jQuery('#message-form').on('submit', function(e)
		{
			e.preventDefault();

			socket.emit('createMessage', {

				from : 'User',
				text: jQuery('[name=message]').val()
			}, function(){

			});
		});