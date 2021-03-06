
var socket = io();

function scrollToButtom()
{
	//selectors 
	var messages = jQuery('#messages');
	var newMessage = messages.children('li:last-child');

	//Heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight()

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight )
	{
		console.log('Should Scroll');

		messages.scrollTop(scrollHeight);
	}


}

		socket.on('connect', function(){
			console.log('connected to server');
			var params = jQuery.deparam(window.location.search);
			console.log(params);

			socket.emit('join', params, function(err)
			{
				if(err)
				{
					alert(err);
					window.location.href = '/';

				}
				else
				{
						console.log("No error");
				}
			});
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

		socket.on('updateUserList', function(users){
				console.log('Users List', users);
				var ol = jQuery('<ol></ol>');

				users.forEach(function(user){
					ol.append(jQuery('<li></li>').text(user));
				});

				jQuery('#users').html(ol);


		});

		socket.on('newMessage', function(message){
		
			 // jQuery('#messages').empty();
			 // var formatedTime  = moment(message.createdAt).format('h:m a');
			 // console.log('new Message ', message);
			 // var li = jQuery('<li></li>');
			 // li.text(message.from + '(' + formatedTime + '):' + message.text);
			
			 var formatedTime  = moment(message.createdAt).format('h:m a');
			 var template = jQuery('#message-template').html();
			 var html = Mustache.render(template, {
			 	text: message.text,
			 	from : message.from,
			 	createdAt:  formatedTime
			 });

			  jQuery('#messages').append(html);
			  scrollToButtom();


		}); 


			socket.on('newLocationMessage', function(message){
			 // jQuery('#messages').empty();

			 // var formatedTime  = moment(message.createdAt).format('h:m a');
			 // console.log('new Message ', message);
			 // var li = jQuery('<li></li>');
			 // var a = jQuery('<a target="_blank">My Current Location<a>');
			 // li.text(message.from + '( '+ formatedTime +  ' ):' );
			 // a.attr('href',  message.url );
			 // li.append(a);
			 // jQuery('#messages').append(li);

			 var formatedTime  = moment(message.createdAt).format('h:m a');
			 var template = jQuery('#location-message-template').html();
			 var html = Mustache.render(template, {
			 	// text: message.text,
			 	from : message.from,
			 	createdAt:  formatedTime,
			 	url : message.url
			 });

			  jQuery('#messages').append(html);
			  scrollToButtom();

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

			var messageTextBox =  jQuery('[name=message]'); 

			socket.emit('createMessage', {

				//from : 'User',
				text: messageTextBox.val()
			}, function(){
						messageTextBox.val('');
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

			locationButton.attr('disabled',  'disabled').text('Sending location...');

			navigator.geolocation.getCurrentPosition(function(position)
			{
					console.log(position);
					var real_latitude =  position.coords.latitude ? position.coords.latitude : 0;
					var real_longitude =  position.coords.longitude ? position.coords.longitude  : 0;
					socket.emit('createLocationMessage', {
						latitude: real_latitude,
						longitude:  real_longitude
					});
					locationButton.removeAttr('disabled').text('Send location');

			}, function(e){

				alert('Unable to fetch location.');
				locationButton.removeAttr('disabled').text('Send location');
				var real_latitude =   0;
					var real_longitude =  0;
					socket.emit('createLocationMessage', {
						latitude: real_latitude,
						longitude:  real_longitude
					});

			});

		});