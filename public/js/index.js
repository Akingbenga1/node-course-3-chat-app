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

		// socket.on('newEmail', function (email){
		// 	console.log('new Email', email);

		// }); 

		socket.on('newMessage', function(message){
			 // jQuery('#messages').empty();
			 console.log('new Message ', message);
			 var li = jQuery('<li></li>');
			 li.text(message.from + ':' + message.text);
			 jQuery('#messages').append(li);
		}); 


			socket.on('newLocationMessage', function(message){
			 // jQuery('#messages').empty();
			 console.log('new Message ', message);
			 var li = jQuery('<li></li>');
			 var a = jQuery('<a target="_blank">My Current Location<a>');
			 li.text(message.from + ':' );
			 a.attr('href',  message.url );
			 li.append(a);
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


		var locationButton  = jQuery('#send-location');

		locationButton.on('click', function(e)
		{
			e.preventDefault();
			if(!navigator.geolocation)
			{
				return alert("Geolocation not supported by your brower. ");
			}

			navigator.geolocation.getCurrentPosition(function(position)
			{
					console.log(position);
					var real_latitude =  position.coords.latitude ? position.coords.latitude : 0;
					var real_longitude =  position.coords.longitude ? position.coords.longitude  : 0;
					socket.emit('createLocationMessage', {
						latitude: real_latitude,
						longitude:  real_longitude
					});

			}, function(e){

				alert('Unable to fetch location.');
				var real_latitude =   0;
					var real_longitude =  0;
					socket.emit('createLocationMessage', {
						latitude: real_latitude,
						longitude:  real_longitude
					});

			});

		});