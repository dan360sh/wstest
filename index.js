var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter;
var WebSocket = new require('ws');
var fs = require('fs');
var https = require('https');
var url = require('url');

var nodemailer = require('nodemailer');
var regemail = {}
var server = new WebSocket.Server({port: 2400});
function rand(min, max)
 {
   return Math.floor(Math.random() * (max - min) + min);
 }
 function Soket(){
	var mass = {};
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
        console.log(ot.type)
	  });
	  ws.on('close', function() {
	    delete mass[u];
	  });
	});   
}
soket = new Soket();
event.on('reg',reg);
var connection = {};
function reg(data){	
	var ws = data.ws;
    var password = data.content.password;
    var login = data.content.login;
    var to = data.content.email;
    console.log(data.content.password)
    if(connection[login] == undefined){
    	var r = rand(10000,100000);
    	regemail[r] = {pass:password,login:login}
    	var code = 'code='+code;
    	email(to,code);
    	soket.send({type:'emailok',content:'письмо отправляется на почту'},data.ws);
    }else{
        soket.send({type:'error',content:'login занят'},data.ws); 
    }
    
}
event.on('email',pemail);
function pemail(data){
    if(regemail[data.content]!=undefined){
    	var e = regemail[data.content];
    	regemail[r] = {pass:password,login:login}
        connection[e.login] = {pass:e.pass}
        soket.send({type:'regok'},data.ws); 
    } 
}
function email(to,code){
 var mailOptions, transporter;
 var content;
 content = "<a href='http://swqazx8w.beget.tech/?"+code+"'>перейдите по сылке для подтверждения регистрации</a>" 
 transporter = nodemailer.createTransport({
   service: 'Gmail',
   auth: {
     user: 'swqazxcd@gmail.com',
     pass: 'romabaranov228'
   }
 });
 mailOptions = {
   from: 'Slavik <swqazxcd@gmail.com>',
   to: to,
   subject: 'подтверждение регистрации',
   html: content
 };
 transporter.sendMail(mailOptions, function(err, info) {
   if (err) {
     return console.log(err);

  }
   return console.log("Message sent: " + info.response);
 });
}
//const nodemailer = require('nodemailer');

// let transporter = nodemailer.createTransport({
//     host: 'swqazxcd@gmail.com',
//     port: 587,
//     secure: false,
//     requireTLS: true,
//     auth: {
//         user: 'swqazxcd@gmail.com',
//         pass: 'romabaranov228'
//     }
// });

// let mailOptions = {
//     from: 'swqazxcd@gmail.com',
//     to: 'angry.shitov@yandex.ru',
//     subject: 'Test',
//     text: 'Hello World!'
// };

// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//     	emailsend = error.message;
//         return console.log(error.message);
//     }
//     emailsend = info.response;
//     return console.log("Message sent: " + info.response);
// });