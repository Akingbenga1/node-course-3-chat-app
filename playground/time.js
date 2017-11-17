var moment = require('moment');

var date = moment();

// date.add(1, 'year').subtract(5, 'months');
var createdAt = 12345;

var sometimeStamp = moment().valueOf();
console.log(sometimeStamp);
var date = moment(createdAt);
console.log(date.format('hh:mm a'));

