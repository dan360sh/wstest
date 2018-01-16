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
    	var code = 'code='+r;
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
    	//regemail[r] = {pass:password,login:login}
        connection[e.login] = {pass:e.pass,login:e.login}
        soket.send({type:'regok',content:{
        	password:e.pass,
        	login:e.login
        }},data.ws); 
    }else{
    	soket.send({type:'regno'},data.ws);
    } 
}
event.on('check',check_in)
function check_in(data){
     if(connection[data.content.login]!=undefined){
     	if(connection[data.content.login].pass==data.content.password){
     	 soket.send({type:'checkok',content:{
          klot:34  
        }},data.ws);
     	}else{

     	soket.send({type:'nocheck'},data.ws);
        }
     }else{
     	soket.send({type:'nocheck'},data.ws);
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
function Get(){
	var a = 0;
	this.count = function(){
		a++;
		return a;
	}
	this.get = function(metod,parametr,token,id){
		https.get("https://api.vk.com/method/"+metod+"?"+parametr+"&access_token="+token+"&v=5.69", (res)=>{ 
			   res.setEncoding('utf-8');
			   let rawData = '';
			   res.on('data', (chunk) => { rawData += chunk;});
			   res.on('end', () => {
			   var parsedData = JSON.parse(rawData);
			   if(id!=undefined){
			   	event.emit(id,parsedData);
			   }
			   
			   
			 });
		});
    }
}
var token = "ab0fa41f76b82962c161ebf5a86e94c405159405111217aaa8363b960033ad530687207cb35ee0c5ce61b";
var get = new Get();
get.get('messages.getLongPollServer','',token,'lol');
var parametr = 'domain=your_dreams0&message=spokoynoy_nochi)';
//get.get('messages.send',parametr,token);
event.once('lol',longpjl)
var count = 0;
function longpjl(data){
	  var data2 = data.response;
      var server = data2.server;
      var key = data2.key;
      var ts = data2.ts;
      setInterval(function(){
	      https.get('https://'+server+'?act=a_check&key='+key+'&ts='+ts+'&wait=2&mode=90&version=2', (res)=>{ 
				   res.setEncoding('utf-8');
				   let rawData = '';
				   res.on('data', (chunk) => { rawData += chunk;});
				   res.on('end', () => {
				   var parsedData = JSON.parse(rawData);
				   //console.log(parsedData);
				   //event.emit('lol',data)
				   ts = parsedData.ts; 
				   //console.log(count)
				   var updates =  parsedData.updates
				   for(var i in updates){
                     if(updates[i][0] == 4){
                        console.log(updates[i][5])
                        console.log(updates[i][6])
                     }  
				   }
				   count++;
				 
				   	//longpjl(data)
				  
				 });
			});
      },3000);
}

   

