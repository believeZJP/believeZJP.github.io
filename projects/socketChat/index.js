//Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('../..')(server);
var port = process.env.PORT || 3000;

server.listener(port,function(){
	console.log('Server listening at port %d',port);
});

//Routing
app.use(express.static(__dirname + '/public'));

//Chatroom

var numUsers = 0;
io.on('conneciton',function(socket){
	var addedUser = false;
	//当客户端触发‘新信息’,开始监听并执行以下代码
	socket.on('new message',function(data){
		//告诉客户端广播 ‘new message’
		socket.broadcast.emit('new message',{
			username: socket.username,
			message: data
		});
	});
	
	//触发‘add user’,启动监听和执行以下代码
	socket.on('add user',function(username){
		if(addedUser) return;
		
		//将socket session的用户名存到当前客户端
		socket.username = username;
		++numUsers;
		addedUser = true;
		socket.emit('login',{
			numUsers:numUsers
		});
		
		//通知所有客户端，有用户接入
		socket.broadcast.emit('user joined',{
			username: socket.username,
			numUsers: numUsers
		});
	});
	
	//终端触发 ‘typing’，通知其他用户
	socket.on('typing',function(){
		socket.broadcast.emit('typing',{
			username: socket.username
		});
	});
	
	//终端触发‘stop typing’，通知其他用户
	socket.on('stop typing',function(){
		socket.broadcast.emit('stop typing',{
			username: socket.username
		});
	});
	
	//用户离开，执行...
	socket.on('disconnect',function(){
		if(addedUser){
			--numUsers;
			
			//通知其他终端，当前用户离开
			socket.broadcast.emit('user left',{
				username: socket.username,
				numUsers: numUsers
			});
		}
	});
});



