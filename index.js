var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter;
var WebSocket = new require('ws');
var fs = require('fs');
var https = require('https');
var url = require('url');

nodemailer = require('nodemailer');
// var file = require('./massiv.json');
var server = new WebSocket.Server({port: 2400});
 function soket(){
	this.mass = {};
	var count = 0;
	var a = 0;
	this.count = function(){
		a++;
		return a;
	}
	// this.massws = function(){
	// 	return mass;
	// }
	this.send = function(message,id){
		if(mass[id]!=undefined){
		   mass[id].ws.send(JSON.stringify(message));
		}
		
	}
	this.allsend = function(message){
       for(var i in mass){
		   mass[i].send(JSON.stringify(message));
       }
	}
	server.on('connection', function(ws) {
	  var u = count;
	  count++; 
	  mass[u] = {ws:ws};
	 // ws.send(JSON.stringify({type:'users',content:newfile()}));
	  ws.on('message', function(message) {
	  	var ot = JSON.parse(message);
	  	ot['ws'] = u;
        event.emit(ot.type,ot);
	  });
	  ws.on('close', function() {
	    delete mass[u];
	  });
	});   
}
var Soket = soket();
event.on('mes',mes);
var emailsend;
function mes(data){
	send({type:'mes',content:emailsend},data.ws); 
	//console.log(Soket.mass);
}


var mailOptions, nodemailer, transporter;

transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'smtps://swqazxcd%40gmail.com',
    pass: 'romabaranov228'
  }
});
mailOptions = {
  from: 'Slavik <swqazxcd@gmail.com>',
  to: 'angry.shitov@yandex.ru',
  subject: 'Hello',
  html: '<b>test</b>'
};
transporter.sendMail(mailOptions, function(err, info) {
  if (err) {
  	emailsend = err;
    return console.log(err);

  }
  return console.log("Message sent: " + info.response);
});